"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassageMockDao = void 0;
const inversify_1 = require("inversify");
const Errors_1 = require("../../../app/constants/Errors");
let PassageMockDao = class PassageMockDao {
    constructor() {
        this.db = [
            {
                _id: "1",
                ownerKey: "WhizzimoAcademy:139",
                passage: "Hello.This is magic1.",
                workbookKeys: [
                    "tWe9lI05em"
                ]
            },
            {
                _id: "2",
                workbookKeys: [
                    "d7VbCKFmsf"
                ],
                ownerKey: "WhizzimoAcademy:74",
                passage: "Testing .."
            }
        ];
    }
    create(data) {
        return new Promise((resolve, reject) => {
            this.db.push(data);
            resolve('OK');
        });
    }
    delete(id) {
        return undefined;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            const passage = this.db.find(passage => passage._id === id);
            resolve(passage);
        });
    }
    getMany(id) {
        return undefined;
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            let passageIndex = this.db.findIndex(passage => passage._id === id);
            if (passageIndex < 0) {
                reject(Errors_1.Errors.notFound('Passage'));
            }
            this.db[passageIndex] = Object.assign(Object.assign({}, this.db[passageIndex]), data);
            resolve('OK');
        });
    }
};
PassageMockDao = __decorate([
    inversify_1.injectable()
], PassageMockDao);
exports.PassageMockDao = PassageMockDao;
//# sourceMappingURL=PassageMockDao.js.map