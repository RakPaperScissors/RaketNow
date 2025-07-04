"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./entities/user/user.module");
const user_entity_1 = require("./entities/user/entities/user.entity");
const organization_module_1 = require("./entities/organization/organization.module");
const raketista_module_1 = require("./entities/raketista/raketista.module");
const organization_entity_1 = require("./entities/organization/entities/organization.entity");
const raketista_entity_1 = require("./entities/raketista/entities/raketista.entity");
const auth_module_1 = require("./auth/auth.module");
const rakets_module_1 = require("./entities/rakets/rakets.module");
const raket_entity_1 = require("./entities/rakets/entities/raket.entity");
const raket_pictures_module_1 = require("./entities/raket-pictures/raket-pictures.module");
const raket_picture_entity_1 = require("./entities/raket-pictures/entities/raket-picture.entity");
const skills_module_1 = require("./entities/skills/skills.module");
const certification_module_1 = require("./entities/certification/certification.module");
const job_history_module_1 = require("./entities/job-history/job-history.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '5432'),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [user_entity_1.Users, organization_entity_1.Organization, raketista_entity_1.Raketista, raket_entity_1.Raket, raket_picture_entity_1.RaketPictures],
                ssl: process.env.NODE_ENV === 'production'
                    ? { rejectUnauthorized: false }
                    : false,
                autoLoadEntities: true,
                synchronize: true,
            }),
            user_module_1.UserModule,
            organization_module_1.OrganizationModule,
            raketista_module_1.RaketistaModule,
            auth_module_1.AuthModule,
            rakets_module_1.RaketsModule,
            raket_pictures_module_1.RaketPicturesModule,
            skills_module_1.SkillsModule,
            certification_module_1.CertificationModule,
            job_history_module_1.JobHistoryModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map