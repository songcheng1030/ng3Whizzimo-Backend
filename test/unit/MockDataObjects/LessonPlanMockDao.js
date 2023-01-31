"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonPlanMockDao = void 0;
const inversify_1 = require("inversify");
let LessonPlanMockDao = class LessonPlanMockDao {
    constructor() {
        this.db = [
            {
                _id: "1",
                order: 0,
                courseId: "1",
                name: "Lesson Plan on Sunday, March 20, 2016",
                notes: "Tap here to type a few notes in this Lesson Plan",
                status: "draft"
            },
            {
                _id: "2",
                order: 0,
                courseId: "2",
                name: "Lesson Plan on Sunday, March 20, 2016",
                notes: "",
                status: "teaching"
            }
        ];
    }
    create(data) {
        return new Promise((resolve, reject) => {
            this.db.push(data);
            resolve(null);
        });
    }
    delete(id) {
        return undefined;
    }
    deleteByCourseId(courseId) {
        return undefined;
    }
    deleteByCourseWorkbookId(courseWorkbookId) {
        return undefined;
    }
    deleteByLessonPlanId(lessonPlanId) {
        return undefined;
    }
    deleteByWorkbookId(workbookId) {
        return undefined;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            let obj = this.db.find(lessonPlan => lessonPlan._id === id);
            resolve(obj);
        });
    }
    getMany(id) {
        return undefined;
    }
    getManyIds(id) {
        return undefined;
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            let objIndex = this.db.findIndex(lessonPlan => lessonPlan._id === id);
            let obj = this.db[objIndex];
            obj = Object.assign(Object.assign({}, obj), data);
            this.db[objIndex] = obj;
        });
    }
    getCountByCourseWorkbookId(courseWorkbookId) {
        return Promise.resolve(undefined);
    }
    getCountByWorkbookId(workbookId) {
        return Promise.resolve(undefined);
    }
};
LessonPlanMockDao = __decorate([
    inversify_1.injectable()
], LessonPlanMockDao);
exports.LessonPlanMockDao = LessonPlanMockDao;
//# sourceMappingURL=LessonPlanMockDao.js.map
