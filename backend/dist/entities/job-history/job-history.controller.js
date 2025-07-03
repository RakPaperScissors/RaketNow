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
exports.JobHistoryController = void 0;
const common_1 = require("@nestjs/common");
const job_history_service_1 = require("./job-history.service");
const create_job_history_dto_1 = require("./dto/create-job-history.dto");
const update_job_history_dto_1 = require("./dto/update-job-history.dto");
let JobHistoryController = class JobHistoryController {
    jobHistoryService;
    constructor(jobHistoryService) {
        this.jobHistoryService = jobHistoryService;
    }
    create(createJobHistoryDto) {
        return this.jobHistoryService.create(createJobHistoryDto);
    }
    findAll() {
        return this.jobHistoryService.findAll();
    }
    findOne(id) {
        return this.jobHistoryService.findOne(+id);
    }
    update(id, updateJobHistoryDto) {
        return this.jobHistoryService.update(+id, updateJobHistoryDto);
    }
    updateTitle(id, value) {
        return this.jobHistoryService.updateField(+id, 'title', value);
    }
    updateDescription(id, value) {
        return this.jobHistoryService.updateField(+id, 'description', value);
    }
    remove(id) {
        return this.jobHistoryService.remove(+id);
    }
};
exports.JobHistoryController = JobHistoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_history_dto_1.CreateJobHistoryDto]),
    __metadata("design:returntype", void 0)
], JobHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_history_dto_1.UpdateJobHistoryDto]),
    __metadata("design:returntype", void 0)
], JobHistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/title'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], JobHistoryController.prototype, "updateTitle", null);
__decorate([
    (0, common_1.Patch)(':id/description'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], JobHistoryController.prototype, "updateDescription", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobHistoryController.prototype, "remove", null);
exports.JobHistoryController = JobHistoryController = __decorate([
    (0, common_1.Controller)('job-history'),
    __metadata("design:paramtypes", [job_history_service_1.JobHistoryService])
], JobHistoryController);
//# sourceMappingURL=job-history.controller.js.map