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
exports.RaketPicturesService = void 0;
const common_1 = require("@nestjs/common");
const raket_entity_1 = require("../rakets/entities/raket.entity");
const raket_picture_entity_1 = require("./entities/raket-picture.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let RaketPicturesService = class RaketPicturesService {
    raket;
    raketPictures;
    constructor(raket, raketPictures) {
        this.raket = raket;
        this.raketPictures = raketPictures;
    }
    async create(createRaketPictureDto, file) {
        const raket = await this.raket.findOne({ where: { raketId: createRaketPictureDto.raketId } });
        if (!raket) {
            throw new common_1.NotFoundException('Raket not found');
        }
        const maxOrderResult = await this.raketPictures
            .createQueryBuilder('raket_pictures')
            .select('MAX(raket_pictures.displayOrder)', 'maxOrder')
            .where('raket_pictures.raket_id = :raketId', { raketId: raket.raketId })
            .getRawOne();
        const newDisplayOrder = (maxOrderResult.maxOrder !== null) ? maxOrderResult.maxOrder + 1 : 0;
        const imageUrl = `https://your-storage-url.com/${file.filename}`;
        const newPicture = this.raketPictures.create({
            raket: raket,
            imageUrl: imageUrl,
            displayOrder: newDisplayOrder,
        });
        return await this.raketPictures.save(newPicture);
    }
    findAll() {
        return `This action returns all raketPictures`;
    }
    findOne(id) {
        return `This action returns a #${id} raketPicture`;
    }
    update(id, updateRaketPictureDto) {
        return `This action updates a #${id} raketPicture`;
    }
    remove(id) {
        return `This action removes a #${id} raketPicture`;
    }
};
exports.RaketPicturesService = RaketPicturesService;
exports.RaketPicturesService = RaketPicturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(raket_entity_1.Raket)),
    __param(1, (0, typeorm_1.InjectRepository)(raket_picture_entity_1.RaketPictures)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RaketPicturesService);
//# sourceMappingURL=raket-pictures.service.js.map