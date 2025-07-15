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
exports.RaketsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const raket_entity_1 = require("./entities/raket.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let RaketsService = class RaketsService {
    raket;
    users;
    constructor(raket, users) {
        this.raket = raket;
        this.users = users;
    }
    async create(createRaketDto) {
        const user = await this.users.findOne({ where: { uid: createRaketDto.user } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const raket = this.raket.create({ ...createRaketDto, user: { uid: createRaketDto.user } });
        return await this.raket.save(raket);
    }
    async findAll() {
        const rakets = await this.raket.find({
            relations: ['user', 'pictures'],
            order: { dateCreated: 'DESC' }
        });
        return rakets.map(raket => ({
            raketId: raket.raketId,
            title: raket.title,
            description: raket.description,
            status: raket.status,
            budget: raket.budget,
            dateCreated: raket.dateCreated,
            completedAt: raket.completedAt,
            user: {
                uid: raket.user.uid,
                email: raket.user.email,
                firtName: raket.user.firstName,
                lastName: raket.user.lastName,
                lastActive: raket.user.lastActive
            },
            pictures: raket.pictures.map(picture => ({
                id: picture.id,
                imageUrl: picture.imageUrl,
                displayOrder: picture.displayOrder
            }))
        }));
    }
    async findOne(raketId) {
        const raket = await this.raket.createQueryBuilder('raket')
            .leftJoinAndSelect('raket.user', 'user')
            .leftJoinAndSelect('raket.pictures', 'pictures')
            .select([
            'raket.raketId',
            'raket.title',
            'raket.description',
            'raket.status',
            'raket.budget',
            'raket.dateCreated',
            'raket.completedAt',
            'user.uid',
            'user.email',
            'user.name',
            'user.lastActive',
            'pictures.id',
            'pictures.imageUrl',
            'pictures.displayOrder',
        ])
            .where('raket.raketId = :raketId', { raketId })
            .getOne();
        if (!raket) {
            throw new common_1.NotFoundException();
        }
        return {
            raketId: raket.raketId,
            title: raket.title,
            description: raket.description,
            status: raket.status,
            budget: raket.budget,
            dateCreated: raket.dateCreated,
            completedAt: raket.completedAt,
            user: {
                uid: raket.user.uid,
                email: raket.user.email,
                firstName: raket.user.firstName,
                lastName: raket.user.lastName,
                lastActive: raket.user.lastActive,
            },
            pictures: raket.pictures.map(picture => ({
                id: picture.id,
                imageUrl: picture.imageUrl,
                displayOrder: picture.displayOrder,
            })),
        };
    }
    async patch(racketId, updateRaketDto) {
        const findRaket = await this.findOne(racketId);
        if (!findRaket) {
            throw new common_1.NotFoundException();
        }
        if ('user' in updateRaketDto) {
            throw new common_1.BadRequestException('Changing the user of a raket is not allowed.');
        }
        Object.assign(findRaket, updateRaketDto);
        return await this.raket.save(findRaket);
    }
    async remove(racketId) {
        const findRaket = await this.findOne(racketId);
        if (!findRaket) {
            throw new common_1.NotFoundException();
        }
        return await this.raket.delete(racketId);
    }
};
exports.RaketsService = RaketsService;
exports.RaketsService = RaketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(raket_entity_1.Raket)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RaketsService);
//# sourceMappingURL=rakets.service.js.map