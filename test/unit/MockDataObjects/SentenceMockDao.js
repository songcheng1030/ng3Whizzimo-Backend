"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceMockDao = void 0;
const inversify_1 = require("inversify");
const Errors_1 = require("../../../app/constants/Errors");
let SentenceMockDao = class SentenceMockDao {
    constructor() {
        this.db = [
            {
                _id: "1",
                ownerKey: "WhizzimoAcademy:139",
                sentence: "Hello.This is magic1.",
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
                sentence: "Testing .."
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
            const sentence = this.db.find(sentence => sentence._id === id);
            resolve(sentence);
        });
    }
    getMany(id) {
        return undefined;
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            let sentenceIndex = this.db.findIndex(sentence => sentence._id === id);
            if (sentenceIndex < 0) {
                reject(Errors_1.Errors.notFound('Sentence'));
            }
            this.db[sentenceIndex] = Object.assign(Object.assign({}, this.db[sentenceIndex]), data);
            resolve('OK');
        });
    }
};
SentenceMockDao = __decorate([
    inversify_1.injectable()
], SentenceMockDao);
exports.SentenceMockDao = SentenceMockDao;
//# sourceMappingURL=SentenceMockDao.js.map