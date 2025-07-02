"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSkillDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_skill_dto_1 = require("./create-skill.dto");
class UpdateSkillDto extends (0, mapped_types_1.PartialType)(create_skill_dto_1.CreateSkillDto) {
}
exports.UpdateSkillDto = UpdateSkillDto;
//# sourceMappingURL=update-skill.dto.js.map