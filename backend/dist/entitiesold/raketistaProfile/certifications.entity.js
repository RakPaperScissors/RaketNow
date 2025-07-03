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
exports.Certification = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let Certification = class Certification {
    certId;
    title;
    fileURL;
    isAuthenticated;
    issuingOrganization;
    raketistaId;
};
exports.Certification = Certification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Certification.prototype, "certId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Certification.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 999, nullable: true }),
    __metadata("design:type", String)
], Certification.prototype, "fileURL", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Certification.prototype, "isAuthenticated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Certification.prototype, "issuingOrganization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, user => user.uid, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "raketistaId", referencedColumnName: "uid" }),
    __metadata("design:type", user_entity_1.Users)
], Certification.prototype, "raketistaId", void 0);
exports.Certification = Certification = __decorate([
    (0, typeorm_1.Entity)()
], Certification);
//# sourceMappingURL=certifications.entity.js.map