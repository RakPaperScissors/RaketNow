"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRaketDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_raket_dto_1 = require("./create-raket.dto");
class UpdateRaketDto extends (0, mapped_types_1.PartialType)(create_raket_dto_1.CreateRaketDto) {
}
exports.UpdateRaketDto = UpdateRaketDto;
//# sourceMappingURL=update-raket.dto.js.map