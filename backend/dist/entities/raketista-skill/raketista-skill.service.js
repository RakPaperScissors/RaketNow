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
exports.RaketistaSkillService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const raketista_skill_entity_1 = require("./entities/raketista-skill.entity");
const typeorm_2 = require("typeorm");
const raketista_entity_1 = require("../raketista/entities/raketista.entity");
const skill_entity_1 = require("../skills/entities/skill.entity");
let RaketistaSkillService = class RaketistaSkillService {
    rsRepo;
    raketistaRepo;
    skillsRepo;
    constructor(rsRepo, raketistaRepo, skillsRepo) {
        this.rsRepo = rsRepo;
        this.raketistaRepo = raketistaRepo;
        this.skillsRepo = skillsRepo;
    }
    async create(createRaketistaSkillDto) {
        const raketista = await this.raketistaRepo.findOneBy({ uid: createRaketistaSkillDto.raketistaId });
        const skill = await this.skillsRepo.findOneBy({ skill_Id: createRaketistaSkillDto.skillId });
        if (!raketista || !skill) {
            throw new common_1.NotFoundException('Raketista or Skill not found');
        }
        const existing = await this.rsRepo.findOne({
            where: {
                raketista: { uid: createRaketistaSkillDto.raketistaId },
                skill: { skill_Id: createRaketistaSkillDto.skillId },
            },
        });
        if (existing) {
            return { message: 'Skill already assigned to raketista' };
        }
        const raketistaSkill = this.rsRepo.create({ raketista, skill });
        return this.rsRepo.save(raketistaSkill);
    }
    findAll() {
        return this.rsRepo.find({
            relations: ['raketista', 'skill'],
        });
    }
    async findOne(id) {
        const found = await this.rsRepo.findOne({
            where: { id },
            relations: ['raketista', 'skill'],
        });
        if (!found)
            throw new common_1.NotFoundException(`RaketistaSkill with ID ${id} not found.`);
        return found;
    }
    async update(id, updateRaketistaSkillDto) {
        const existing = await this.rsRepo.findOneBy({ id });
        if (!existing)
            throw new common_1.NotFoundException(`RaketistaSkill with ID ${id} not found.`);
        if (updateRaketistaSkillDto.raketistaId) {
            const raketista = await this.raketistaRepo.findOneBy({ uid: updateRaketistaSkillDto.raketistaId });
            if (!raketista)
                throw new common_1.NotFoundException(`Raketista not found.`);
            existing.raketista = raketista;
        }
        if (updateRaketistaSkillDto.skillId) {
            const skill = await this.skillsRepo.findOneBy({ skill_Id: updateRaketistaSkillDto.skillId });
            if (!skill)
                throw new common_1.NotFoundException('Skill not found.');
            existing.skill = skill;
        }
        return this.rsRepo.save(existing);
    }
    async remove(id) {
        const result = await this.rsRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`RaketistaSkill with id ${id} not found.`);
        }
        return { message: 'Deleted successfully.' };
    }
};
exports.RaketistaSkillService = RaketistaSkillService;
exports.RaketistaSkillService = RaketistaSkillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(raketista_skill_entity_1.RaketistaSkill)),
    __param(1, (0, typeorm_1.InjectRepository)(raketista_entity_1.Raketista)),
    __param(2, (0, typeorm_1.InjectRepository)(skill_entity_1.Skills)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RaketistaSkillService);
//# sourceMappingURL=raketista-skill.service.js.map