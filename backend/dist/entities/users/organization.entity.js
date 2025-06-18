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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Organization = class Organization extends user_entity_1.Users {
    org_id;
    org_name;
    is_verified;
};
exports.Organization = Organization;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', unsigned: true }),
    __metadata("design:type", Number)
], Organization.prototype, "org_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Organization.prototype, "org_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Organization.prototype, "is_verified", void 0);
exports.Organization = Organization = __decorate([
    (0, typeorm_1.ChildEntity)()
], Organization);
//# sourceMappingURL=organization.entity.js.map