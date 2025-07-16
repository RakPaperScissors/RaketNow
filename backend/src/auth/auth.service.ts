import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userRole, Users } from 'src/entities/user/entities/user.entity';
import { profile } from 'console';
import { Raketista } from 'src/entities/raketista/entities/raketista.entity';
import { Organization } from 'src/entities/organization/entities/organization.entity';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private usersRepo: Repository<Users>,
        private jwtService: JwtService,
    ) {}

    // 1. AUTH FUNCTION - Register for new users
    async register(email: string, password: string, firstName: string, lastName: string, role: userRole = userRole.CLIENT, organizationName?: string) {
        // Hash the inputted password
        const hashed = await bcrypt.hash(password, 10);
        // Creates a new user with provided details
        let user;

        if (role === userRole.RAKETISTA) {
            const raketista = new Raketista();
            raketista.email = email;
            raketista.password = hashed;
            raketista.firstName = firstName;
            raketista.lastName = lastName;
            raketista.role = role;
            user = raketista;
        } else if (role === userRole.ORGANIZATION) {
            const org = new Organization();
            org.email = email;
            org.password = hashed;
            org.firstName = firstName;
            org.lastName = lastName;
            org.role = role;
            org.orgName = organizationName || ''; // if applicable
            user = org;
        } else {
            const client = new Users();
            client.email = email;
            client.password = hashed;
            client.firstName = firstName;
            client.lastName = lastName;
            client.role = role;
            user = client;
        }
        // Saves the user to the database
        return await this.usersRepo.save(user);
    }

    // 2. AUTH FUNCTION - Login for existing users
    async login(email: string, password: string) {
        // Finds the user by email
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) {
            // Throw an unauthorized exception if user is not found
            throw new UnauthorizedException('Invalid credentials');
        }
        // Compares the inputted password with the hashed password of the user
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Throw an unauthorized exception if password is invalid
            throw new UnauthorizedException('Invalid credentials');
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
            relations: ['raketistaSkills', 'raketistaSkills.skill']
        });
        if (!user) {
            // Throw an unauthorized exception if user is not found
            throw new UnauthorizedException('User not found');
        }
        // Exclude some fields from the GET profile
        const {password, providerId, authProvider, deletedAt, ...profile} = user;
        return profile;
    }

    // 4. AUTH FUNCTION - Change password for logged in user
    async changePassword(uid: number, oldPassword: string, newPassword: string) {
        // Find the user by uid
        const user = await this.usersRepo.findOne({ where: { uid } });
        if (!user) {
            // Throw a not found exception if user is not found
            throw new NotFoundException('User not found');
        }
        // Check if the old password matches the user's new password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new BadRequestException('Old password is incorrect');
        }
        // Hash the new password
        const hashed = await bcrypt.hash(newPassword, 10);
        // Update the user's password with the new one and save
        user.password = hashed;
        await this.usersRepo.save(user);
        return { message: 'Password updated successfully'};
    }

    
}
