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
exports.RaketsController = void 0;
const common_1 = require("@nestjs/common");
const rakets_service_1 = require("./rakets.service");
const create_raket_dto_1 = require("./dto/create-raket.dto");
const update_raket_dto_1 = require("./dto/update-raket.dto");
let RaketsController = class RaketsController {
    raketsService;
    constructor(raketsService) {
        this.raketsService = raketsService;
    }
    create(createRaketDto) {
        return this.raketsService.create(createRaketDto);
    }
    findAll() {
        return this.raketsService.findAll();
    }
    findOne(id) {
        return this.raketsService.findOne(+id);
    }
    update(id, updateRaketDto) {
        return this.raketsService.update(+id, updateRaketDto);
    }
    remove(id) {
        return this.raketsService.remove(+id);
    }
};
exports.RaketsController = RaketsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_raket_dto_1.CreateRaketDto]),
    __metadata("design:returntype", void 0)
], RaketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RaketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RaketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_raket_dto_1.UpdateRaketDto]),
    __metadata("design:returntype", void 0)
], RaketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RaketsController.prototype, "remove", null);
exports.RaketsController = RaketsController = __decorate([
    (0, common_1.Controller)('rakets'),
    __metadata("design:paramtypes", [rakets_service_1.RaketsService])
], RaketsController);
//# sourceMappingURL=rakets.controller.js.map