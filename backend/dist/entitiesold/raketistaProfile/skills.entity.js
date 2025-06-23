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
exports.Skills = void 0;
const typeorm_1 = require("typeorm");
const raketistaProfile_entity_1 = require("../users/raketistaProfile.entity");
let Skills = class Skills {
    skill_Id;
    skillName;
    category;
    raketistas;
};
exports.Skills = Skills;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Skills.prototype, "skill_Id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Skills.prototype, "skillName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Skills.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => raketistaProfile_entity_1.RaketistaProfile, raketista => raketista.skills),
    __metadata("design:type", Array)
], Skills.prototype, "raketistas", void 0);
exports.Skills = Skills = __decorate([
    (0, typeorm_1.Entity)()
], Skills);
//# sourceMappingURL=skills.entity.js.map