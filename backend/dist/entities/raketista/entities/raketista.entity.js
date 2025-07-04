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
exports.Raketista = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./../../user/entities/user.entity");
let Raketista = class Raketista extends user_entity_1.Users {
    bio;
    isRaketistaVerified;
    aveResponseTime;
    isAutoReplyEnabled;
    autoReplyMessage;
};
exports.Raketista = Raketista;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Raketista.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Raketista.prototype, "isRaketistaVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Raketista.prototype, "aveResponseTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Raketista.prototype, "isAutoReplyEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Raketista.prototype, "autoReplyMessage", void 0);
exports.Raketista = Raketista = __decorate([
    (0, typeorm_1.ChildEntity)()
], Raketista);
//# sourceMappingURL=raketista.entity.js.map