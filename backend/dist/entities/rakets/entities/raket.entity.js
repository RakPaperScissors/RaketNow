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
exports.Raket = exports.RaketStatus = void 0;
const raket_picture_entity_1 = require("../../raket-pictures/entities/raket-picture.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
var RaketStatus;
(function (RaketStatus) {
    RaketStatus["OPEN"] = "open";
    RaketStatus["IN_PROGRESS"] = "in_progress";
    RaketStatus["COMPLETED"] = "completed";
    RaketStatus["CANCELLED"] = "cancelled";
})(RaketStatus || (exports.RaketStatus = RaketStatus = {}));
let Raket = class Raket {
    raketId;
    user;
    title;
    description;
    status;
    budget;
    pictures;
    dateCreated;
    completedAt;
};
exports.Raket = Raket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Raket.prototype, "raketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, user => user.uid),
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
    (0, typeorm_1.Column)({ type: 'enum', enum: RaketStatus, default: RaketStatus.OPEN }),
    __metadata("design:type", String)
], Raket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Raket.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => raket_picture_entity_1.RaketPictures, picture => picture.raket),
    __metadata("design:type", Array)
], Raket.prototype, "pictures", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Raket.prototype, "dateCreated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Raket.prototype, "completedAt", void 0);
exports.Raket = Raket = __decorate([
    (0, typeorm_1.Entity)()
], Raket);
//# sourceMappingURL=raket.entity.js.map