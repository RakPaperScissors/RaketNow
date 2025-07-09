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
let RaketistaSkillModule = class RaketistaSkillModule {
};
exports.RaketistaSkillModule = RaketistaSkillModule;
exports.RaketistaSkillModule = RaketistaSkillModule = __decorate([
    (0, common_1.Module)({
        controllers: [raketista_skill_controller_1.RaketistaSkillController],
        providers: [raketista_skill_service_1.RaketistaSkillService],
    })
], RaketistaSkillModule);
//# sourceMappingURL=raketista-skill.module.js.map