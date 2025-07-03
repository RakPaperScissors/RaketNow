"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaketPicturesModule = void 0;
const common_1 = require("@nestjs/common");
const raket_pictures_service_1 = require("./raket-pictures.service");
const raket_pictures_controller_1 = require("./raket-pictures.controller");
const raket_picture_entity_1 = require("./entities/raket-picture.entity");
const typeorm_1 = require("@nestjs/typeorm");
const raket_entity_1 = require("../rakets/entities/raket.entity");
let RaketPicturesModule = class RaketPicturesModule {
};
exports.RaketPicturesModule = RaketPicturesModule;
exports.RaketPicturesModule = RaketPicturesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([raket_picture_entity_1.RaketPictures, raket_entity_1.Raket])],
        controllers: [raket_pictures_controller_1.RaketPicturesController],
        providers: [raket_pictures_service_1.RaketPicturesService],
    })
], RaketPicturesModule);
//# sourceMappingURL=raket-pictures.module.js.map