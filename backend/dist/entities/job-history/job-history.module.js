"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const job_history_service_1 = require("./job-history.service");
const job_history_controller_1 = require("./job-history.controller");
let JobHistoryModule = class JobHistoryModule {
};
exports.JobHistoryModule = JobHistoryModule;
exports.JobHistoryModule = JobHistoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [job_history_controller_1.JobHistoryController],
        providers: [job_history_service_1.JobHistoryService],
    })
], JobHistoryModule);
//# sourceMappingURL=job-history.module.js.map