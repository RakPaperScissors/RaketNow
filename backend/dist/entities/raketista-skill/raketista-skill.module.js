"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaketistaSkillModule = void 0;
const common_1 = require("@nestjs/common");
const raketista_skill_service_1 = require("./raketista-skill.service");
const raketista_skill_controller_1 = require("./raketista-skill.controller");
const typeorm_1 = require("@nestjs/typeorm");
const raketista_skill_entity_1 = require("./entities/raketista-skill.entity");
const raketista_entity_1 = require("../raketista/entities/raketista.entity");
const skill_entity_1 = require("../skills/entities/skill.entity");
let RaketistaSkillModule = class RaketistaSkillModule {
};
exports.RaketistaSkillModule = RaketistaSkillModule;
exports.RaketistaSkillModule = RaketistaSkillModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([raketista_skill_entity_1.RaketistaSkill, raketista_entity_1.Raketista, skill_entity_1.Skills])],
        controllers: [raketista_skill_controller_1.RaketistaSkillController],
        providers: [raketista_skill_service_1.RaketistaSkillService],
    })
], RaketistaSkillModule);
//# sourceMappingURL=raketista-skill.module.js.map