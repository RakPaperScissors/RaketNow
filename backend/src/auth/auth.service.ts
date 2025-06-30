import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userRole, Users } from 'src/entities/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private usersRepo: Repository<Users>,
        private jwtService: JwtService,
    ) {}

    async register(
        email: string,
        password: string,
        name: string,
        role: userRole = userRole.CLIENT
    ) {
        const hashed = await bcrypt.hash(password, 10);
        const user = this.usersRepo.create({ email, password: hashed, name, role });
        return await this.usersRepo.save(user);
    }

    async login(email: string, password: string) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.uid, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }

    async getProfile(uid: number) {
        const user = await this.usersRepo.findOne({ where: { uid } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        // Optionally, return only selected fields:
        // const { password, ...profile } = user;
        // return profile;
        return user;
    }

    async changePassword(uid: number, oldPassword: string, newPassword: string) {
        const user = await this.usersRepo.findOne({ where: { uid } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new BadRequestException('Old password is incorrect');
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await this.usersRepo.save(user);

        return { message: 'Password updated successfully'};
    }
}
