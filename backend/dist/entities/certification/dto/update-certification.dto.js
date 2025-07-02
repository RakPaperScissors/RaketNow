"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCertificationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_certification_dto_1 = require("./create-certification.dto");
class UpdateCertificationDto extends (0, mapped_types_1.PartialType)(create_certification_dto_1.CreateCertificationDto) {
}
exports.UpdateCertificationDto = UpdateCertificationDto;
//# sourceMappingURL=update-certification.dto.js.map