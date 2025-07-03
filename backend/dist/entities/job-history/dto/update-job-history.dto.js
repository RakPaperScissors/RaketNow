"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobHistoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_job_history_dto_1 = require("./create-job-history.dto");
class UpdateJobHistoryDto extends (0, mapped_types_1.PartialType)(create_job_history_dto_1.CreateJobHistoryDto) {
}
exports.UpdateJobHistoryDto = UpdateJobHistoryDto;
//# sourceMappingURL=update-job-history.dto.js.map