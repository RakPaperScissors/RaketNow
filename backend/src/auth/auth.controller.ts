import { Controller, Post, Body, Get, UseGuards, Request, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { userRole } from 'src/entities/user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // POSTs new user
    @Post('register')
    async register(@Body() body: { email: string; password: string; name: string; role?: userRole }) {
        return this.authService.register(body.email, body.password, body.name, body.role);
    }

    // POSTs existing user
    @Post('login')
    login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }

    // GETs profile of logged in user using token
    @Get('me')
    @UseGuards(JwtAuthGuard) // Requires JWT authentication
    getProfile(@Request() req) {
        return this.authService.getProfile(req.user.uid);
    }

    // PATCHs password of logged in user
    @UseGuards(JwtAuthGuard) // Requires JWT authentication
    @Patch('change-password')
    async changePassword(@Request() req, @Body() body: { oldPassword: string, newPassword: string } ) {
        return this.authService.changePassword(req.user.uid, body.oldPassword, body.newPassword);
    }
}
