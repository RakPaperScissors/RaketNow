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
exports.Raket = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let Raket = class Raket {
    racketId;
    user;
    title;
    description;
    status;
    budget;
    dateCreated;
    completedAt;
};
exports.Raket = Raket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Raket.prototype, "racketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, user => user.rakets),
    __metadata("design:type", user_entity_1.Users)
], Raket.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Raket.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], Raket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['open', 'in_progress', 'completed', 'cancelled'] }),
    __metadata("design:type", String)
], Raket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', precision: 5 }),
    __metadata("design:type", Number)
], Raket.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Raket.prototype, "dateCreated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Raket.prototype, "completedAt", void 0);
exports.Raket = Raket = __decorate([
    (0, typeorm_1.Entity)()
], Raket);
//# sourceMappingURL=rakets.entity.js.map