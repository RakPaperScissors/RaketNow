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
const user_entity_1 = require("./entities/users/user.entity");
const raketistaProfile_entity_1 = require("./entities/users/raketistaProfile.entity");
const organization_entity_1 = require("./entities/users/organization.entity");
const rakets_entity_1 = require("./entities/rakets/rakets.entity");
const certifications_entity_1 = require("./entities/raketistaProfile/certifications.entity");
const jobHistory_entity_1 = require("./entities/raketistaProfile/jobHistory.entity");
const skills_entity_1 = require("./entities/raketistaProfile/skills.entity");
const reviews_entity_1 = require("./entities/rakets/reviews.entity");
const raketApplications_entity_1 = require("./entities/rakets/raketApplications.entity");
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
                entities: [user_entity_1.Users, raketistaProfile_entity_1.RaketistaProfile, organization_entity_1.Organization, rakets_entity_1.Raket, certifications_entity_1.Certification, jobHistory_entity_1.JobHistory, skills_entity_1.Skills, reviews_entity_1.Review, raketApplications_entity_1.RaketApplication],
                ssl: process.env.NODE_ENV === 'production'
                    ? { rejectUnauthorized: false }
                    : false,
                autoLoadEntities: true,
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map