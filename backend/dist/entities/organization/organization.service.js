"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
let OrganizationService = class OrganizationService {
    create(createOrganizationDto) {
        return 'This action adds a new organization';
    }
    findAll() {
        return `This action returns all organization`;
    }
    findOne(id) {
        return `This action returns a #${id} organization`;
    }
    update(id, updateOrganizationDto) {
        return `This action updates a #${id} organization`;
    }
    remove(id) {
        return `This action removes a #${id} organization`;
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)()
], OrganizationService);
//# sourceMappingURL=organization.service.js.map