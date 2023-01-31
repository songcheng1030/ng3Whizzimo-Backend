"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhraseMockDao = void 0;
const inversify_1 = require("inversify");
const Errors_1 = require("../../../app/constants/Errors");
let PhraseMockDao = class PhraseMockDao {
    constructor() {
        this.db = [
            {
                _id: "1",
                ownerKey: "WhizzimoAcademy:139",
                phrase: "Hello.This is magic1.",
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
                phrase: "Testing .."
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
            const phrase = this.db.find(phrase => phrase._id === id);
            resolve(phrase);
        });
    }
    getMany(id) {
        return undefined;
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            let phraseIndex = this.db.findIndex(phrase => phrase._id === id);
            if (phraseIndex < 0) {
                reject(Errors_1.Errors.notFound('Phrase'));
            }
            this.db[phraseIndex] = Object.assign(Object.assign({}, this.db[phraseIndex]), data);
            resolve('OK');
        });
    }
};
PhraseMockDao = __decorate([
    inversify_1.injectable()
], PhraseMockDao);
exports.PhraseMockDao = PhraseMockDao;
//# sourceMappingURL=PhraseMockDao.js.map