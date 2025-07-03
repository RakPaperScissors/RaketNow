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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const rakets_entity_1 = require("./rakets.entity");
let Review = class Review {
    uid;
    clientId;
    client;
    raketistaId;
    raketista;
    raketId;
    raket;
    rating;
    comment;
    createdAt;
};
exports.Review = Review;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Review.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'clientId' }),
    __metadata("design:type", Number)
], Review.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, user => user.uid, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", user_entity_1.Users)
], Review.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raketistaID' }),
    __metadata("design:type", Number)
], Review.prototype, "raketistaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, user => user.uid, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'raketistaID' }),
    __metadata("design:type", user_entity_1.Users)
], Review.prototype, "raketista", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raket_id', unique: true }),
    __metadata("design:type", Number)
], Review.prototype, "raketId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => rakets_entity_1.Raket, raket => raket.racketId, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'raket_id' }),
    __metadata("design:type", rakets_entity_1.Raket)
], Review.prototype, "raket", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint' }),
    (0, typeorm_1.Check)(`"rating" >= 1 AND "rating" <= 5`),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Review.prototype, "createdAt", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)({ name: 'reviews' }),
    (0, typeorm_1.Check)(`"clientId" <> "raketistaID"`)
], Review);
//# sourceMappingURL=reviews.entity.js.map