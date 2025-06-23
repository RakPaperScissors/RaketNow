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
exports.JobHistory = exports.jobHistoryType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const rakets_entity_1 = require("../rakets/rakets.entity");
var jobHistoryType;
(function (jobHistoryType) {
})(jobHistoryType || (exports.jobHistoryType = jobHistoryType = {}));
let JobHistory = class JobHistory {
    jobId;
    title;
    description;
    historyType;
    jobDate;
    racketId;
    raketistaId;
};
exports.JobHistory = JobHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobHistory.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], JobHistory.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], JobHistory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: jobHistoryType, nullable: false }),
    __metadata("design:type", Number)
], JobHistory.prototype, "historyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], JobHistory.prototype, "jobDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => rakets_entity_1.Raket, raket => raket.racketId, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "racketId", referencedColumnName: "racketId" }),
    __metadata("design:type", rakets_entity_1.Raket)
], JobHistory.prototype, "racketId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, user => user.uid, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "raketistiaId", referencedColumnName: "uid" }),
    __metadata("design:type", user_entity_1.Users)
], JobHistory.prototype, "raketistaId", void 0);
exports.JobHistory = JobHistory = __decorate([
    (0, typeorm_1.Entity)()
], JobHistory);
//# sourceMappingURL=jobHistory.entity.js.map