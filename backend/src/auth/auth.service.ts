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

export interface AuthJwtPayload {
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    private jwtService: JwtService,
    private userService: UserService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
  ) {}

  // 1. AUTH FUNCTION - Register for new users
  async register(createUserDto: CreateUserDto): Promise<Users> {
    // Check if a user with this email already exists
    const existingUser = await this.usersRepo.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }
    
    let userToCreate;
    if (createUserDto.password) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      userToCreate = {
        ...createUserDto,
        password: hashedPassword,
        authProvider: 'local',
      };
    } else {
      userToCreate = {
        ...createUserDto,
        password: null, // No password for OAuth users
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
    
    return this.usersRepo.save(userEntity);
  }

  // 2. AUTH FUNCTION - Login for existing users
  async login(email: string, password: string) {
    // Finds the user by email
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      // Throw an unauthorized exception if user is not found
      throw new UnauthorizedException("Invalid credentials");
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

  async verifyJwt(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
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
}
