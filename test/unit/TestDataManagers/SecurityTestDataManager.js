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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityTestDataManager = void 0;
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../../types"));
let SecurityTestDataManager = class SecurityTestDataManager {
    constructor(dao) {
        this._dao = dao;
    }
    createUser(body) {
        return this._dao.createUser(body);
    }
    deleteUser(id) {
        return this._dao.deleteUser(id);
    }
    getUser(id) {
        return this._dao.getUser(id);
    }
    searchUsers(field, value) {
        return this._dao.searchUsers(field, value);
    }
    updateUser(id, updatedUssr) {
        return this._dao.updateUser(id, updatedUssr);
    }
    verifyUser(token) {
        return new Promise((resolve, reject) => {
            this._dao
                .verifyUser(token)
                .then((result) => {
                if (result) {
                    return resolve(result);
                }
                this._dao
                    .verifyUser(token)
                    .then((result) => {
                    result.token = token;
                    return;
                })
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            })
                .catch((error) => reject(error));
        });
    }
    getUserByEmailAddress(emailAddress) {
        return Promise.resolve(undefined);
    }
    resetPassword(emailAddress) {
        return Promise.resolve(undefined);
    }
};
SecurityTestDataManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.SecurityDataObject)),
    __metadata("design:paramtypes", [Object])
], SecurityTestDataManager);
exports.SecurityTestDataManager = SecurityTestDataManager;
//# sourceMappingURL=SecurityTestDataManager.js.map