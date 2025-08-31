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

  async register(createUserDto: CreateUserDto): Promise<Users> {
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
    if (createUserDto.password && savedUser.verificationCode) {
      await this.emailService.sendVerificationEmail(savedUser, savedUser.verificationCode);
    }
    return savedUser;

  }

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    //Checks if the email is verified first
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email before logging in.');
    }

    // Compares the inputted password with the hashed password of the user
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { email: user.email, sub: user.uid, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async getProfile(uid: number) {
    const user = await this.usersRepo.findOne({
      where: { uid },
      relations: ["raketistaSkills", "raketistaSkills.skill"],
    });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const { password, providerId, authProvider, deletedAt, ...rest } = user;
    return {
      ...rest,
      profilePicture: user.profilePicture
        ? `${process.env.PICTURE_URL}/raketnow/${user.profilePicture}`
        : `${process.env.PICTURE_URL}/raketnow/user-profile-pictures/default_profile.jpg`,
    };
  }

  async changePassword(uid: number, oldPassword: string, newPassword: string) {
    const user = await this.usersRepo.findOne({ where: { uid } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException("Old password is incorrect");
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await this.usersRepo.save(user);
    return { message: "Password updated successfully" };
  }

 async verifyJwt(token: string): Promise<ValidatedJwtPayload | null> {
    try {
      const payload = this.jwtService.verify(token);
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
    return user;
  }

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

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const user = await this.usersRepo.findOne({ where: { email } });

    if (!user) {
      return { message: 'If an account with that email exists, a new verification code has been sent.' };
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('This email address has already been verified.');
    }

    if (user.verificationCodeExpiresAt && new Date() < user.verificationCodeExpiresAt) {
      const now = new Date();
      const expiration = user.verificationCodeExpiresAt;
      const minutesRemaining = Math.ceil((expiration.getTime() - now.getTime()) / 60000);

      if (minutesRemaining > 2) { 
        throw new BadRequestException(`Please wait a few minutes before requesting a new code.`);
      }
    }

    const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const newExpiresAt = new Date();
    newExpiresAt.setMinutes(newExpiresAt.getMinutes() + 15);

    user.verificationCode = newVerificationCode;
    user.verificationCodeExpiresAt = newExpiresAt;
    await this.usersRepo.save(user);

    await this.emailService.sendVerificationEmail(user, newVerificationCode);

    return { message: 'A new verification code has been sent to your email address.' };
  }
}
