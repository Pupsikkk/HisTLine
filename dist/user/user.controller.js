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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_model_1 = require("./user.model");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAll() {
        return this.userService.getAllUsers();
    }
    getOne(id) {
        return this.userService.getUser(id);
    }
    createUser(body) {
        return this.userService.addUser(body);
    }
    updateUser(body) {
        return this.userService.updateUser(body);
    }
    deleteUser(body) {
        return this.userService.deleteUser(body);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Отримати список усіх користувачів' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [user_model_1.User] }),
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Отримати одного користувача по його id' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: user_model_1.User }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Створити нового користувача' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, type: user_model_1.User }),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Оновити поля користувача' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK }),
    (0, common_1.Put)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Видалення користувача' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK }),
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('Користувачі'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map