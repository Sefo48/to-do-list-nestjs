"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
let UsersService = class UsersService {
    constructor() {
        this.filePath = 'data.json';
    }
    async createUser(user) {
        let users = [];
        try {
            const data = await fs_1.promises.readFile(this.filePath, 'utf-8');
            users = JSON.parse(data);
        }
        catch (error) {
            throw new Error(error);
        }
        users.push(user);
        await fs_1.promises.writeFile(this.filePath, JSON.stringify(users));
    }
    async findAll() {
        try {
            const data = await fs_1.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findById(id) {
        const users = await this.findAll();
        return users.find(user => user.id === id);
    }
    async deleteById(id) {
        const users = await this.findAll();
        const updatedUsers = users.filter(user => user.id !== id);
        await fs_1.promises.writeFile(this.filePath, JSON.stringify(updatedUsers));
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map