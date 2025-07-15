import { AuthService } from './auth.service';
import { userRole } from 'src/entities/user/entities/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role?: userRole;
    }): Promise<import("src/entities/user/entities/user.entity").Users>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<{
        uid: number;
        email: string;
        firstName: string;
        lastName: string;
        role: userRole;
        profilePicture: string;
        lastActive: Date;
        createdAt: Date;
    }>;
    changePassword(req: any, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
}
