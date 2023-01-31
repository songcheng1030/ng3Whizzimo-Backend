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
exports.FileTestDataManager = void 0;
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../../types"));
let FileTestDataManager = class FileTestDataManager {
    constructor(dao) {
        this._dao = dao;
    }
    create(data) {
        return this._dao.create(data);
    }
    delete(id) {
        return this._dao.delete(id);
    }
    get(id) {
        return this._dao.get(id);
    }
    getMany(id) {
        return this._dao.getMany(id);
    }
    update(id, data) {
        return this._dao.update(id, data);
    }
    simpleCreate(data) {
        return Promise.resolve(undefined);
    }
};
FileTestDataManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.FileDataObject)),
    __metadata("design:paramtypes", [Object])
], FileTestDataManager);
exports.FileTestDataManager = FileTestDataManager;
//# sourceMappingURL=FileTestDataManager.js.map