import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { userRole, Users } from "src/entities/user/entities/user.entity";
import { profile } from "console";
import { Raketista } from "src/entities/raketista/entities/raketista.entity";
import { Organization } from "src/entities/organization/entities/organization.entity";
import { CreateUserDto } from "src/entities/user/dto/create-user.dto";
import { UserService } from "src/entities/user/user.service";
import refreshJwtConfig from "./refresh-jwt.config";
import { ConfigType } from "@nestjs/config";
import { EmailService } from "src/entities/email/email.service";

export interface AuthJwtPayload {
  sub: number;
}

export interface ValidatedJwtPayload {
  id: number;
  email: string;
  role: string; 
}


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    private jwtService: JwtService,
    private userService: UserService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    private readonly emailService: EmailService,
  ) {}

  // 1. AUTH FUNCTION - Register for new users
  async register(createUserDto: CreateUserDto): Promise<Users> {
    // Check if a user with this email already exists
    const existingUser = await this.usersRepo.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }
    
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // Code expires in 15 minutes

    let userToCreate;
    if (createUserDto.password) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      userToCreate = {
        ...createUserDto,
        password: hashedPassword,
        authProvider: 'local',
        isEmailVerified: false, // User is not verified yet
        verificationCode: verificationCode,
        verificationCodeExpiresAt: expiresAt,
      };
    } else {
      userToCreate = {
        ...createUserDto,
        password: null, // No password for OAuth users
        isEmailVerified: true,
        verificationCode: null,
        verificationCodeExpiresAt: null,
      };
    }

    let userEntity: Users;
    const role = createUserDto.role || userRole.CLIENT;
    userToCreate.role = role;
    userToCreate.roles = [role];

    if (role === userRole.RAKETISTA) {
      const raketista = new Raketista();
      Object.assign(raketista, userToCreate);
      userEntity = raketista;
    } else if (role === userRole.ORGANIZATION) {
      const org = new Organization();
      Object.assign(org, userToCreate);
      org.orgName = createUserDto.organizationName || '';
      userEntity = org;
    } else {
      const client = new Users();
      Object.assign(client, userToCreate);
      userEntity = client
    }

    Object.assign(userEntity, userToCreate);
    
    const savedUser = await this.usersRepo.save(userEntity);

    // 6. Send verification email ONLY if it was a local registration
    if (createUserDto.password && savedUser.verificationCode) {
      await this.emailService.sendVerificationEmail(savedUser, savedUser.verificationCode);
    }
    
    // 7. Return the created user object, which is what `validateAndLinkGoogleUser` expects.
    return savedUser;
  }

  // 2. AUTH FUNCTION - Login for existing users
  async login(email: string, password: string) {
    // Finds the user by email
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      // Throw an unauthorized exception if user is not found
      throw new UnauthorizedException("Invalid credentials");
    }
    //Checks if the email is verified first
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email before logging in.');
    }

    // Compares the inputted password with the hashed password of the user
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Throw an unauthorized exception if password is invalid
      throw new UnauthorizedException("Invalid credentials");
    }
    // If the user is found and password is valid, create and return a JWT Token
    const payload = { email: user.email, sub: user.uid, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  // 3. AUTH FUNCTION - Get profile of logged in user
  async getProfile(uid: number) {
    // Find the user by uid
    const user = await this.usersRepo.findOne({
      where: { uid },
      relations: ["raketistaSkills", "raketistaSkills.skill"],
    });
    if (!user) {
      // Throw an unauthorized exception if user is not found
      throw new UnauthorizedException("User not found");
    }
    // Exclude some fields from the GET profile
    const { password, providerId, authProvider, deletedAt, ...rest } = user;
    return {
      ...rest,
      profilePicture: user.profilePicture
        ? `http://localhost:9000/raketnow/${user.profilePicture}`
        : "http://localhost:9000/raketnow/user-profile-pictures/default_profile.jpg",
    };
  }

  // 4. AUTH FUNCTION - Change password for logged in user
  async changePassword(uid: number, oldPassword: string, newPassword: string) {
    // Find the user by uid
    const user = await this.usersRepo.findOne({ where: { uid } });
    if (!user) {
      // Throw a not found exception if user is not found
      throw new NotFoundException("User not found");
    }
    // Check if the old password matches the user's new password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException("Old password is incorrect");
    }
    // Hash the new password
    const hashed = await bcrypt.hash(newPassword, 10);
    // Update the user's password with the new one and save
    user.password = hashed;
    await this.usersRepo.save(user);
    return { message: "Password updated successfully" };
  }

 async verifyJwt(token: string): Promise<ValidatedJwtPayload | null> {
    try {
      const payload = this.jwtService.verify(token);
      // Map the 'sub' from the JWT payload to 'id' for consistency
      return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };
    } catch (e) {
      return null;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException("User not found!");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException("Invalid credentials");

    return { id: user.uid };
  }

  async validateAndLinkGoogleUser(googleProfile: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  }): Promise<Users> {
    let user = await this.usersRepo.findOne({
      where: { providerId: googleProfile.id, authProvider: 'google' },
    });

    if (!user) {
      user = await this.usersRepo.findOne({
        where: { email: googleProfile.email },
      });
      if (user) {
        user.providerId = googleProfile.id;
        user.authProvider = 'google';
        await this.usersRepo.save(user);
      }
    }

    if (!user) {
      user = await this.register({
        email: googleProfile.email,
        firstName: googleProfile.firstName,
        lastName: googleProfile.lastName,
        authProvider: 'google',
        providerId: googleProfile.id,
        profilePicture: googleProfile.profilePicture,
        role: userRole.CLIENT,
        createdAt: new Date(),
      });
    }
    return user; // Return the user entity
  }
  
  // Keep your `login` method, but let it accept a user object
  // This will now be used by both local and google login flows.
  async generateJwtToken(user: Users) {
    const payload = { email: user.email, sub: user.uid, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (user.isEmailVerified) {
      throw new BadRequestException('Email is already verified.');
    }
    const isCodeValid = user.verificationCode === code;
    const isCodeExpired = new Date() > user.verificationCodeExpiresAt;
    if (!isCodeValid || isCodeExpired) {
      throw new BadRequestException('Invalid or expired verification code.');
    }

    user.isEmailVerified = true;
    user.verificationCode = "";
    user.verificationCodeExpiresAt = new Date(0);
    await this.usersRepo.save(user);

    // Log the user in by returning a JWT token
    const payload = { email: user.email, sub: user.uid, role: user.role };
    return {
      message: 'Email verified successfully!',
      access_token: this.jwtService.sign(payload),
    };
  }
}
