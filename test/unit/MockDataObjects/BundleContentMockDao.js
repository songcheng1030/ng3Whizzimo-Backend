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
exports.BundleContentMockDao = void 0;
const inversify_1 = require("inversify");
const randomstring = __importStar(require("randomstring"));
let BundleContentMockDao = class BundleContentMockDao {
    constructor() {
        this.db = [];
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
    deleteByBundleId(bundleId) {
        return undefined;
    }
    deleteByContentId(contentId) {
        return undefined;
    }
    deleteManyByContentId(contentIds) {
        return undefined;
    }
    get(id) {
        return undefined;
    }
    getMany(id) {
        return undefined;
    }
    update(id, data) {
        return undefined;
    }
};
BundleContentMockDao = __decorate([
    inversify_1.injectable()
], BundleContentMockDao);
exports.BundleContentMockDao = BundleContentMockDao;
//# sourceMappingURL=BundleContentMockDao.js.map