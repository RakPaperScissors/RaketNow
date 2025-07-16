"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user/entities/user.entity");
const raketista_entity_1 = require("../entities/raketista/entities/raketista.entity");
const organization_entity_1 = require("../entities/organization/entities/organization.entity");
let AuthService = class AuthService {
    usersRepo;
    jwtService;
    constructor(usersRepo, jwtService) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
    }
    async register(email, password, firstName, lastName, role = user_entity_1.userRole.CLIENT, organizationName) {
        const hashed = await bcrypt.hash(password, 10);
        let user;
        if (role === user_entity_1.userRole.RAKETISTA) {
            const raketista = new raketista_entity_1.Raketista();
            raketista.email = email;
            raketista.password = hashed;
            raketista.firstName = firstName;
            raketista.lastName = lastName;
            raketista.role = role;
            raketista.roles = [raketista.role];
            user = raketista;
        }
        else if (role === user_entity_1.userRole.ORGANIZATION) {
            const org = new organization_entity_1.Organization();
            org.email = email;
            org.password = hashed;
            org.firstName = firstName;
            org.lastName = lastName;
            org.role = role;
            org.roles = [org.role];
            org.orgName = organizationName || '';
            user = org;
        }
        else {
            const client = new user_entity_1.Users();
            client.email = email;
            client.password = hashed;
            client.firstName = firstName;
            client.lastName = lastName;
            client.role = role;
            client.roles = [client.role];
            user = client;
        }
        return await this.usersRepo.save(user);
    }
    async login(email, password) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.uid, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }
    async getProfile(uid) {
        const user = await this.usersRepo.findOne({
            where: { uid },
            relations: ['raketistaSkills', 'raketistaSkills.skill']
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const { password, providerId, authProvider, deletedAt, ...profile } = user;
        return profile;
    }
    async changePassword(uid, oldPassword, newPassword) {
        const user = await this.usersRepo.findOne({ where: { uid } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await this.usersRepo.save(user);
        return { message: 'Password updated successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map