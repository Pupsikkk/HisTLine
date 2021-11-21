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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./user.model");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUser(id) {
        return await this.userRepository.findOne({ where: { id } });
    }
    async getAllUsers() {
        return await this.userRepository.findAll();
    }
    async addUser(newPotentialUser) {
        const { login, password } = newPotentialUser;
        const candidate = await this.userRepository.findOne({ where: { login } });
        if (candidate)
            throw new common_1.HttpException('Користувач з таким логіном уже існує!', common_1.HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(password, 5);
        return this.userRepository.create({
            login: login,
            password: hashPassword,
        });
    }
    async updateUser(updatingUser) {
    }
    async deleteUser(candidateForDeleting) { }
    async getUserById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map