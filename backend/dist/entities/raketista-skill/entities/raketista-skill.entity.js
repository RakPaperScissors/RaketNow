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
exports.RaketistaSkill = void 0;
const typeorm_1 = require("typeorm");
const raketista_entity_1 = require("../../raketista/entities/raketista.entity");
const skill_entity_1 = require("../../skills/entities/skill.entity");
let RaketistaSkill = class RaketistaSkill {
    id;
    raketista;
    skill;
};
exports.RaketistaSkill = RaketistaSkill;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RaketistaSkill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => raketista_entity_1.Raketista, raketista => raketista.raketistaSkills, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'raketistaId', referencedColumnName: 'uid' }),
    __metadata("design:type", raketista_entity_1.Raketista)
], RaketistaSkill.prototype, "raketista", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => skill_entity_1.Skills, skill => skill.raketistaSkills, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'skill_Id', referencedColumnName: 'skill_Id' }),
    __metadata("design:type", skill_entity_1.Skills)
], RaketistaSkill.prototype, "skill", void 0);
exports.RaketistaSkill = RaketistaSkill = __decorate([
    (0, typeorm_1.Entity)()
], RaketistaSkill);
//# sourceMappingURL=raketista-skill.entity.js.map