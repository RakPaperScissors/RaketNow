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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const rakets_entity_1 = require("../rakets/rakets.entity");
let Users = class Users {
    uid;
    email;
    password;
    name;
    role;
    authProvider;
    providerId;
    profilePicture;
    lastActive;
    createdAt;
    deletedAt;
    rakets;
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Users.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "authProvider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Users.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Users.prototype, "lastActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Users.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rakets_entity_1.Raket, raket => raket.user),
    __metadata("design:type", Array)
], Users.prototype, "rakets", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.TableInheritance)({ column: { type: 'varchar', name: 'type' } })
], Users);
//# sourceMappingURL=user.entity.js.map