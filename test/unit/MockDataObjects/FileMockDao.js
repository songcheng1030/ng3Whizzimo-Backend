"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMockDao = void 0;
const inversify_1 = require("inversify");
let FileMockDao = class FileMockDao {
    constructor() {
        this.db = [
            {
                _id: '1',
                ownerKey: 'WhizzimoAcademy:1',
                newFile: {}
            },
            {
                _id: '2',
                ownerKey: 'WhizzimoAcademy:2',
                newFile: {}
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
    get(id) {
        return new Promise((resolve, reject) => {
            resolve(this.db.find(item => item._id === id));
        });
    }
    getMany(id) {
        return undefined;
    }
    update(id, data) {
        return undefined;
    }
};
FileMockDao = __decorate([
    inversify_1.injectable()
], FileMockDao);
exports.FileMockDao = FileMockDao;
//# sourceMappingURL=FileMockDao.js.map