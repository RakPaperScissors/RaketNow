import { Controller, Post, Body, Get, UseGuards, Request, Patch, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { userRole, Users } from 'src/entities/user/entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { GoogleAuthGuard } from 'src/common/google-auth/google-auth.guard';
import { CreateUserDto } from 'src/entities/user/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // POSTs new user
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    // POSTs existing user
    @Post('login')
    async login(@Body() body: { email: string; password: string }, @Res({ passthrough: true }) res: Response) {
        const tokenResponse = await this.authService.login(body.email, body.password);

        res.cookie('access_token', tokenResponse.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return { message: 'Login successful' }; // Return a simple success message
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

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin(){
        
    }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(@Req() req, @Res() res: Response) {
        const user = req.user as Users;
        const tokenResponse = await this.authService.generateJwtToken(user);

        res.cookie('access_token', tokenResponse.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.redirect(`http://localhost:5173/home`);
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', { path: '/' });
        return { message: 'Logged out successfully' };
    }
}
