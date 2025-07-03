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
exports.JobHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_history_entity_1 = require("./entities/job-history.entity");
const raket_entity_1 = require("../rakets/entities/raket.entity");
let JobHistoryService = class JobHistoryService {
    jobHistoryRepo;
    raketRepo;
    constructor(jobHistoryRepo, raketRepo) {
        this.jobHistoryRepo = jobHistoryRepo;
        this.raketRepo = raketRepo;
    }
    async create(dto) {
        if (dto.historyType === 'Raket') {
            if (!dto.raketId) {
                throw new common_1.BadRequestException('raketId is required for Raket job history');
            }
            const raket = await this.raketRepo.findOne({ where: { raketId: dto.raketId } });
            if (!raket || raket.status !== 'completed') {
                throw new common_1.BadRequestException('Raket not found or not completed');
            }
            const history = this.jobHistoryRepo.create({
                title: raket.title,
                description: raket.description,
                historyType: 'Raket',
                raket: raket,
            });
            return this.jobHistoryRepo.save(history);
        }
        const manualHistory = this.jobHistoryRepo.create({
            title: dto.title,
            description: dto.description,
            historyType: 'Work_Experience',
        });
        return this.jobHistoryRepo.save(manualHistory);
    }
    findAll() {
        return this.jobHistoryRepo.find();
    }
    async findOne(jobId) {
        const history = await this.jobHistoryRepo.findOne({ where: { jobId } });
        if (!history) {
            throw new common_1.NotFoundException(`Job history #${jobId} not found`);
        }
        return history;
    }
    async update(id, dto) {
        const history = await this.findOne(id);
        Object.assign(history, dto);
        return this.jobHistoryRepo.save(history);
    }
    async updateField(id, field, value) {
        const allowedFields = ['title', 'description'];
        if (!allowedFields.includes(field)) {
            throw new common_1.BadRequestException(`Field '${field}' is not allowed to be updated`);
        }
        const history = await this.findOne(id);
        if (field === 'title') {
            if (!value || value.trim() === '') {
                throw new common_1.BadRequestException('Title is required and cannot be empty');
            }
            history.title = value;
        }
        if (field === 'description') {
            history.description = value?.trim() === '' ? 'No description' : value;
        }
        return this.jobHistoryRepo.save(history);
    }
    async remove(id) {
        const history = await this.findOne(id);
        return this.jobHistoryRepo.remove(history);
    }
};
exports.JobHistoryService = JobHistoryService;
exports.JobHistoryService = JobHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_history_entity_1.JobHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(raket_entity_1.Raket)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JobHistoryService);
//# sourceMappingURL=job-history.service.js.map