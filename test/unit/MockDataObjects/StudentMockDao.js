"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StudentMockDao_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentMockDao = void 0;
const inversify_1 = require("inversify");
let StudentMockDao = StudentMockDao_1 = class StudentMockDao {
    create(data) {
        return new Promise((resolve) => {
            StudentMockDao_1.db.push(data);
            resolve(null);
        });
    }
    delete(id) {
        return undefined;
    }
    get(id) {
        return new Promise((resolve) => {
            const user = StudentMockDao_1.db.find(user => user.userId === id);
            resolve(user);
        });
    }
    getMany(id) {
        return undefined;
    }
    update(id, data) {
        return undefined;
    }
};
StudentMockDao.db = [
    {
        teacherId: '1',
        userId: '1'
    }
];
StudentMockDao = StudentMockDao_1 = __decorate([
    inversify_1.injectable()
], StudentMockDao);
exports.StudentMockDao = StudentMockDao;
//# sourceMappingURL=StudentMockDao.js.map
