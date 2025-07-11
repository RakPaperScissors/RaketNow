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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const skill_entity_1 = require("./entities/skill.entity");
let SkillsService = class SkillsService {
    skillsRepository;
    constructor(skillsRepository) {
        this.skillsRepository = skillsRepository;
    }
    async create(createSkillDto) {
        const newSkill = this.skillsRepository.create(createSkillDto);
        return this.skillsRepository.save(newSkill);
    }
    async findAll() {
        return this.skillsRepository.find();
    }
    async findOne(id) {
        const skill = await this.skillsRepository.findOneBy({ skill_Id: id });
        if (!skill) {
            throw new common_1.NotFoundException(`Skill with ID ${id} not found.`);
        }
        return skill;
    }
    async update(id, updateSkillDto) {
        const skill = await this.skillsRepository.preload({
            skill_Id: id,
            ...updateSkillDto,
        });
        if (!skill) {
            throw new common_1.NotFoundException(`Skill with ID ${id} not found.`);
        }
        return this.skillsRepository.save(skill);
    }
    async remove(id) {
        const result = await this.skillsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Skill with ID ${id} not found.`);
        }
    }
};
exports.SkillsService = SkillsService;
exports.SkillsService = SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skill_entity_1.Skills)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SkillsService);
//# sourceMappingURL=skills.service.js.map