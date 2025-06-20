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
exports.RaketistaProfile = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const skills_entity_1 = require("../raketistaProfile/skills.entity");
let RaketistaProfile = class RaketistaProfile extends user_entity_1.Users {
    bio;
    isRaketistaVerified;
    aveResponseTime;
    isAutoReplyEnabled;
    autoReplyMessage;
    skills;
};
exports.RaketistaProfile = RaketistaProfile;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], RaketistaProfile.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], RaketistaProfile.prototype, "isRaketistaVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], RaketistaProfile.prototype, "aveResponseTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RaketistaProfile.prototype, "isAutoReplyEnabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], RaketistaProfile.prototype, "autoReplyMessage", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => skills_entity_1.Skills, skills => skills.raketistas),
    (0, typeorm_1.JoinTable)({
        name: 'raketistaSkills',
        joinColumn: {
            name: 'raketistaId',
            referencedColumnName: 'uid',
        },
        inverseJoinColumn: {
            name: 'skill_Id',
            referencedColumnName: 'skill_Id',
        }
    }),
    __metadata("design:type", Array)
], RaketistaProfile.prototype, "skills", void 0);
exports.RaketistaProfile = RaketistaProfile = __decorate([
    (0, typeorm_1.ChildEntity)()
], RaketistaProfile);
//# sourceMappingURL=raketistaProfile.entity.js.map