"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRaketistaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_raketista_dto_1 = require("./create-raketista.dto");
class UpdateRaketistaDto extends (0, mapped_types_1.PartialType)(create_raketista_dto_1.CreateRaketistaDto) {
}
exports.UpdateRaketistaDto = UpdateRaketistaDto;
//# sourceMappingURL=update-raketista.dto.js.map