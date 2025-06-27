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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaketPictures = void 0;
const raket_entity_1 = require("../../rakets/entities/raket.entity");
const typeorm_1 = require("typeorm");
let RaketPictures = class RaketPictures {
    id;
    raketId;
    raket;
    imageUrl;
    displayOrder;
    createdAt;
};
exports.RaketPictures = RaketPictures;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], RaketPictures.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raket_id', type: 'uuid' }),
    __metadata("design:type", String)
], RaketPictures.prototype, "raketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raket_entity_1.Raket, raket => raket.pictures, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'raket_id' }),
    __metadata("design:type", raket_entity_1.Raket)
], RaketPictures.prototype, "raket", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'text' }),
    __metadata("design:type", String)
], RaketPictures.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_order', type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], RaketPictures.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], RaketPictures.prototype, "createdAt", void 0);
exports.RaketPictures = RaketPictures = __decorate([
    (0, typeorm_1.Entity)({ name: 'raketPictures' })
], RaketPictures);
//# sourceMappingURL=raket-picture.entity.js.map