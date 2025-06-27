"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaketsModule = void 0;
const common_1 = require("@nestjs/common");
const rakets_service_1 = require("./rakets.service");
const rakets_controller_1 = require("./rakets.controller");
const typeorm_1 = require("@nestjs/typeorm");
const raket_entity_1 = require("./entities/raket.entity");
const user_entity_1 = require("../user/entities/user.entity");
let RaketsModule = class RaketsModule {
};
exports.RaketsModule = RaketsModule;
exports.RaketsModule = RaketsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([raket_entity_1.Raket, user_entity_1.Users])],
        controllers: [rakets_controller_1.RaketsController],
        providers: [rakets_service_1.RaketsService],
    })
], RaketsModule);
//# sourceMappingURL=rakets.module.js.map