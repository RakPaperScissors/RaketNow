import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { userRole, Users } from 'src/entities/user/entities/user.entity';
export declare class AuthService {
    private usersRepo;
    private jwtService;
    constructor(usersRepo: Repository<Users>, jwtService: JwtService);
    register(email: string, password: string, name: string, role?: userRole): Promise<Users>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    getProfile(uid: number): Promise<Users>;
    changePassword(uid: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}
