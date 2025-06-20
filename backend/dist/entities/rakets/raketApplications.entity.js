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
exports.RaketApplication = void 0;
const typeorm_1 = require("typeorm");
const rakets_entity_1 = require("./rakets.entity");
const user_entity_1 = require("../users/user.entity");
let RaketApplication = class RaketApplication {
    applicationId;
    raketId;
    raket;
    raketistaId;
    raketista;
    priceProposal;
    dateCreated;
    CompletedAt;
};
exports.RaketApplication = RaketApplication;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RaketApplication.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raketID', type: 'uuid' }),
    __metadata("design:type", String)
], RaketApplication.prototype, "raketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rakets_entity_1.Raket, raket => raket.racketId, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'raketID' }),
    __metadata("design:type", rakets_entity_1.Raket)
], RaketApplication.prototype, "raket", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raketistaID', type: 'uuid' }),
    __metadata("design:type", String)
], RaketApplication.prototype, "raketistaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, user => user.uid, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'raketistaID' }),
    __metadata("design:type", user_entity_1.Users)
], RaketApplication.prototype, "raketista", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], RaketApplication.prototype, "priceProposal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], RaketApplication.prototype, "dateCreated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], RaketApplication.prototype, "CompletedAt", void 0);
exports.RaketApplication = RaketApplication = __decorate([
    (0, typeorm_1.Entity)({ name: 'raketApplications' })
], RaketApplication);
//# sourceMappingURL=raketApplications.entity.js.map