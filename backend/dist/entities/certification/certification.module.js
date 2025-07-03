"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationModule = void 0;
const common_1 = require("@nestjs/common");
const certification_service_1 = require("./certification.service");
const certification_controller_1 = require("./certification.controller");
const typeorm_1 = require("@nestjs/typeorm");
const certification_entity_1 = require("./entities/certification.entity");
let CertificationModule = class CertificationModule {
};
exports.CertificationModule = CertificationModule;
exports.CertificationModule = CertificationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([certification_entity_1.Certification])],
        controllers: [certification_controller_1.CertificationController],
        providers: [certification_service_1.CertificationService],
    })
], CertificationModule);
//# sourceMappingURL=certification.module.js.map