import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userRole, Users } from 'src/entities/user/entities/user.entity';
import { profile } from 'console';
import { Raketista } from 'src/entities/raketista/entities/raketista.entity';
import { Organization } from 'src/entities/organization/entities/organization.entity';

import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { last } from 'rxjs';
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private usersRepo: Repository<Users>,
        private jwtService: JwtService,
    ) {}

    const cognitoClient = new CognitoIdentityProviderClient({ region: "YOUR_REGION" });

    async register(email: string, password: string, firstName: string, lastName: string, role: userRole, orgName?: string) {
        // 1. Create user in Cognito
        const command = new SignUpCommand({
            ClientId: "YOUR_APP_CLIENT_ID",
            Username: email,
            Password: password,
            UserAttributes: [
                { Name: "email", Value: email },
                { Name: "custom:firstName", Value: firstName },
                { Name: "custom:lastName", Value: lastName },
                { Name: "custom:role", Value: role },
                ...(role === "organization" ? [{ Name: "custom:orgName", Value: orgName || "" }] : [])
            ]
        });
        const cognitoRes = await cognitoClient.send(command);

        // 2. Save user in your DB (with Cognito sub as providerId)
        const user = new Users();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.role = role;
        user.orgName = orgName;
        user.authProvider = "cognito";
        user.providerId = cognitoRes.UserSub; // Cognito userId
        return await this.usersRepo.save(user);
    }


    async login(email: string, password: string) {
    // 1. Authenticate with Cognito
    const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: "YOUR_APP_CLIENT_ID",
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    });
    const response = await cognitoClient.send(command);
    const tokens = response.AuthenticationResult;

    // 2. Decode Cognito token to get sub/userId
    const decoded = jwt.decode(tokens.IdToken); // use a JWT library
    const cognitoSub = decoded.sub;

    // 3. Fetch user profile from your DB
    const user = await this.usersRepo.findOne({ where: { providerId: cognitoSub } });

    return { tokens, user };
}
}

