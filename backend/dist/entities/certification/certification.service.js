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
exports.CertificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const certification_entity_1 = require("./entities/certification.entity");
let CertificationService = class CertificationService {
    certRepo;
    constructor(certRepo) {
        this.certRepo = certRepo;
    }
    async create(dto, raketistaId) {
        const cert = this.certRepo.create({
            ...dto,
            raketistaId: { uid: raketistaId },
        });
        return this.certRepo.save(cert);
    }
    findAll() {
        return this.certRepo.find();
    }
    findOne(id) {
        return this.certRepo.findOneBy({ certId: id });
    }
    async update(id, updateDto) {
        await this.certRepo.update(id, updateDto);
        return this.certRepo.findOneBy({ certId: id });
    }
    async remove(id) {
        await this.certRepo.delete(id);
        return { message: `Certification #${id} deleted` };
    }
    async updateField(id, fields) {
        await this.certRepo.update(id, fields);
        return this.certRepo.findOneBy({ certId: id });
    }
};
exports.CertificationService = CertificationService;
exports.CertificationService = CertificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(certification_entity_1.Certification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CertificationService);
//# sourceMappingURL=certification.service.js.map