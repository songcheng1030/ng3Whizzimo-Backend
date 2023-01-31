"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseWorkbookMockDao = void 0;
const inversify_1 = require("inversify");
let CourseWorkbookMockDao = class CourseWorkbookMockDao {
    constructor() {
        this.db = [
            {
                _id: "1",
                concept: "new",
                order: 14,
                workbookId: "23DBrUNm0P",
                courseId: "1",
                ownerKey: "WhizzimoAcademy:19"
            },
            {
                _id: "2",
                concept: "new",
                order: 15,
                workbookId: "BTDtTI7BVN",
                courseId: "2",
                ownerKey: "WhizzimoAcademy:19"
            }
        ];
    }
    create(data) {
        return new Promise((resolve, reject) => {
            this.db.push(data);
            resolve(data);
        });
    }
    delete(id) {
        return undefined;
    }
    deleteByWorkbookId(workbookId) {
        return undefined;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            resolve(this.db.find(courseWorkbook => courseWorkbook._id == id));
        });
    }
    getByCourseId(courseId) {
        return undefined;
    }
    getMany(id) {
        return undefined;
    }
    update(id, data) {
        return undefined;
    }
    deleteFromCourseWorkbookByWorkbookId(workbookId, courseId) {
        return Promise.resolve(undefined);
    }
    getCountByWorkbookId(workbookId) {
        return Promise.resolve(undefined);
    }
    getNonMerged(id) {
        return Promise.resolve(undefined);
    }
};
CourseWorkbookMockDao = __decorate([
    inversify_1.injectable()
], CourseWorkbookMockDao);
exports.CourseWorkbookMockDao = CourseWorkbookMockDao;
//# sourceMappingURL=CourseWorkbookMockDao.js.map