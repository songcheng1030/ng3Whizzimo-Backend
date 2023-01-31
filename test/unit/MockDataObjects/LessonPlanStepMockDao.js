"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonPlanStepMockDao = void 0;
const inversify_1 = require("inversify");
let LessonPlanStepMockDao = class LessonPlanStepMockDao {
    constructor() {
        this.db = [
            {
                _id: 1,
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name: 'Test Step',
                words: [],
                tiles: []
            },
            {
                _id: 2,
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name: 'Test Step',
                words: [],
                tiles: []
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
            const lessonPlanStep = this.db.find(lps => lps._id === id);
            resolve(lessonPlanStep);
        });
    }
    getMany(id) {
        return undefined;
    }
    getManyIds(id) {
        return undefined;
    }
    update(id, data) {
        return undefined;
    }
    getCountByCourseWorkbookId(courseWorkbookId) {
        return Promise.resolve(undefined);
    }
    getCountByWorkbookId(workbookId) {
        return Promise.resolve(undefined);
    }
};
LessonPlanStepMockDao = __decorate([
    inversify_1.injectable()
], LessonPlanStepMockDao);
exports.LessonPlanStepMockDao = LessonPlanStepMockDao;
//# sourceMappingURL=LessonPlanStepMockDao.js.map
