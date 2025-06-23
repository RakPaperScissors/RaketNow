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
exports.RaketistaController = void 0;
const common_1 = require("@nestjs/common");
const raketista_service_1 = require("./raketista.service");
const create_raketista_dto_1 = require("./dto/create-raketista.dto");
const update_raketista_dto_1 = require("./dto/update-raketista.dto");
let RaketistaController = class RaketistaController {
    raketistaService;
    constructor(raketistaService) {
        this.raketistaService = raketistaService;
    }
    create(createRaketistaDto) {
        return this.raketistaService.create(createRaketistaDto);
    }
    findAll() {
        return this.raketistaService.findAll();
    }
    findOne(id) {
        return this.raketistaService.findOne(+id);
    }
    update(id, updateRaketistaDto) {
        return this.raketistaService.update(+id, updateRaketistaDto);
    }
    remove(id) {
        return this.raketistaService.remove(+id);
    }
};
exports.RaketistaController = RaketistaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_raketista_dto_1.CreateRaketistaDto]),
    __metadata("design:returntype", void 0)
], RaketistaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RaketistaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RaketistaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_raketista_dto_1.UpdateRaketistaDto]),
    __metadata("design:returntype", void 0)
], RaketistaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RaketistaController.prototype, "remove", null);
exports.RaketistaController = RaketistaController = __decorate([
    (0, common_1.Controller)('raketista'),
    __metadata("design:paramtypes", [raketista_service_1.RaketistaService])
], RaketistaController);
//# sourceMappingURL=raketista.controller.js.map