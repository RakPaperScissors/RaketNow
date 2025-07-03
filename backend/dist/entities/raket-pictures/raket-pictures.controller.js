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
exports.RaketPicturesController = void 0;
const common_1 = require("@nestjs/common");
const raket_pictures_service_1 = require("./raket-pictures.service");
const create_raket_picture_dto_1 = require("./dto/create-raket-picture.dto");
const update_raket_picture_dto_1 = require("./dto/update-raket-picture.dto");
const platform_express_1 = require("@nestjs/platform-express");
let RaketPicturesController = class RaketPicturesController {
    raketPicturesService;
    constructor(raketPicturesService) {
        this.raketPicturesService = raketPicturesService;
    }
    create(createRaketPictureDto, file) {
        return this.raketPicturesService.create(createRaketPictureDto, file);
    }
    findAll() {
        return this.raketPicturesService.findAll();
    }
    findOne(id) {
        return this.raketPicturesService.findOne(+id);
    }
    update(id, updateRaketPictureDto) {
        return this.raketPicturesService.update(+id, updateRaketPictureDto);
    }
    remove(id) {
        return this.raketPicturesService.remove(+id);
    }
};
exports.RaketPicturesController = RaketPicturesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10000000 }),
            new common_1.FileTypeValidator({ fileType: /(jpeg|png)$/ }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_raket_picture_dto_1.CreateRaketPictureDto, Object]),
    __metadata("design:returntype", void 0)
], RaketPicturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RaketPicturesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RaketPicturesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_raket_picture_dto_1.UpdateRaketPictureDto]),
    __metadata("design:returntype", void 0)
], RaketPicturesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RaketPicturesController.prototype, "remove", null);
exports.RaketPicturesController = RaketPicturesController = __decorate([
    (0, common_1.Controller)('raketPictures'),
    __metadata("design:paramtypes", [raket_pictures_service_1.RaketPicturesService])
], RaketPicturesController);
//# sourceMappingURL=raket-pictures.controller.js.map