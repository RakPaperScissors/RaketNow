import { Controller, Post, Body, Get, UseGuards, Request, Patch, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { userRole, Users } from 'src/entities/user/entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { GoogleAuthGuard } from 'src/common/google-auth/google-auth.guard';
import { CreateUserDto } from 'src/entities/user/dto/create-user.dto';

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

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin(){
        
    }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(@Req() req, @Res() res) {
        const user = req.user as Users;

        // Call the service method to generate a JWT for this user.
        const tokenResponse = await this.authService.generateJwtToken(user);
        res.redirect(`http://localhost:3000/auth/callback?token=${tokenResponse.accessToken}`);
    }
}
