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
const user_module_1 = require("./user/user.module");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const user_model_1 = require("./user/user.model");
const role_module_1 = require("./role/role.module");
const role_model_1 = require("./role/role.model");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: +process.env.POSTGRES_PORT,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASS,
                models: [user_model_1.User, role_model_1.Role],
                autoLoadModels: true,
            }),
            user_module_1.UserModule,
            role_module_1.RoleModule,
            auth_module_1.AuthModule,
        ],
        exports: [],
        providers: [],
        controllers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map