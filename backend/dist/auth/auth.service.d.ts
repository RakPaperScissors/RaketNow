import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { userRole, Users } from 'src/entities/user/entities/user.entity';
export declare class AuthService {
    private usersRepo;
    private jwtService;
    constructor(usersRepo: Repository<Users>, jwtService: JwtService);
    register(email: string, password: string, firstName: string, lastName: string, role?: userRole, organizationName?: string): Promise<any>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    getProfile(uid: number): Promise<{
        uid: number;
        email: string;
        firstName: string;
        lastName: string;
        role: userRole;
        profilePicture: string;
        lastActive: Date;
        createdAt: Date;
        conversations: import("../entities/conversation/entities/conversation.entity").Conversation[];
        messages: import("../entities/message/entities/message.entity").Message[];
    }>;
    changePassword(uid: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    verifyJwt(token: string): Promise<any>;
}
