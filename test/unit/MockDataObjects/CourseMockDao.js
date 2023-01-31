"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CourseMockDao_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseMockDao = void 0;
const inversify_1 = require("inversify");
let CourseMockDao = CourseMockDao_1 = class CourseMockDao {
    create(data) {
        return new Promise((resolve) => {
            CourseMockDao_1.db.push(data);
            resolve(data);
        });
    }
    delete(id) {
        return undefined;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            resolve(CourseMockDao_1.db.find(course => course._id === id));
        });
    }
    getBySharedKey(sharedKey) {
        return undefined;
    }
    getMany(id) {
        return new Promise((resolve) => {
            const course = CourseMockDao_1.db.filter(course => course.teacherKey === id);
            resolve(course);
        });
    }
    update(id, data) {
        return undefined;
    }
};
CourseMockDao.db = [
    {
        _id: "1",
        courseType: "Class",
        firstname: "Untitled",
        teacherKey: "WhizzimoAcademy:1"
    },
    {
        _id: "2",
        courseType: "Class",
        firstname: "Amy Herd",
        notes: "This course covers common phonics concepts taught in an early or remedial literacy program.",
        teacherKey: "WhizzimoAcademy:53",
        type: "Default/Practice Student"
    }
];
CourseMockDao = CourseMockDao_1 = __decorate([
    inversify_1.injectable()
], CourseMockDao);
exports.CourseMockDao = CourseMockDao;
//# sourceMappingURL=CourseMockDao.js.map