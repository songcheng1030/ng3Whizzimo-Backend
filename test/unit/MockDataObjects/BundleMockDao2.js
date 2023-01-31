"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundleMockDao2 = void 0;
const inversify_1 = require("inversify");
const randomstring = __importStar(require("randomstring"));
let BundleMockDao2 = class BundleMockDao2 {
    constructor() {
        this.test = 1;
        this.db = [
            {
                "_id": "1",
                "ownerKey": "1",
                "type": "course",
                "name": "test",
                "code": "kub17k"
            }
        ];
    }
    create(data) {
        return new Promise((resolve, reject) => {
            data._id = randomstring.generate({ length: 6, charset: 'alphanumeric' });
            this.db.push(data);
            resolve(data);
        });
    }
    delete(id) {
        return undefined;
    }
    get(id) {
        return new Promise((resolve, reject) => {
            resolve(this.db.find(bundle => bundle._id === id));
        });
    }
    getMany(id) {
        return undefined;
    }
    update(id, data) {
        return new Promise((resolve, reject) => {
            const matchedIndex = this.db.findIndex(bundle => bundle._id === id);
            if (matchedIndex < 0)
                reject();
            else
                resolve('OK');
        });
    }
    getByCode(code) {
        return Promise.resolve(undefined);
    }
};
BundleMockDao2 = __decorate([
    inversify_1.injectable()
], BundleMockDao2);
exports.BundleMockDao2 = BundleMockDao2;
//# sourceMappingURL=BundleMockDao2.js.map