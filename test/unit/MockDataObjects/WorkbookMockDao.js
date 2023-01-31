"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WorkbookMockDao_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkbookMockDao = void 0;
const inversify_1 = require("inversify");
let WorkbookMockDao = WorkbookMockDao_1 = class WorkbookMockDao {
    create(data) {
        return new Promise((resolve, reject) => {
            data._id = Date.now().toString();
            WorkbookMockDao_1.db.push(data);
            resolve(data);
        });
    }
    delete(id) {
        return undefined;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            const workbook = WorkbookMockDao_1.db.find(workbook => workbook._id == id);
            resolve(workbook);
        });
    }
    getMany(id) {
        return undefined;
    }
    getManyById(ids) {
        return undefined;
    }
    update(id, data) {
        return new Promise(resolve => {
            const index = WorkbookMockDao_1.db.findIndex(workbook => workbook._id === id);
            WorkbookMockDao_1.db[index] = Object.assign(Object.assign({}, WorkbookMockDao_1.db[index]), data);
            resolve(WorkbookMockDao_1.db[index]);
        });
    }
};
WorkbookMockDao.db = [
    {
        "_id": "2",
        "hasPhrase": false,
        "owner": "WhizzimoAcademy:147",
        "ownerName": "Eric Smallwood",
    },
    {
        "_id": "1",
        "hasPhrase": false,
        "owner": "WhizzimoAcademy:147",
        "ownerName": "Joan Smallwood",
    }
];
WorkbookMockDao = WorkbookMockDao_1 = __decorate([
    inversify_1.injectable()
], WorkbookMockDao);
exports.WorkbookMockDao = WorkbookMockDao;
//# sourceMappingURL=WorkbookMockDao.js.map