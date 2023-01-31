"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("../../../global"));
global_1.default.isTest = true;
require("mocha");
const inversify_base_config_1 = __importDefault(require("./../../../inversify.base.config"));
const types_1 = __importDefault(require("../../../types"));
// @ts-ignore
const accIndexBusinessManager = inversify_base_config_1.default.get(types_1.default.AccIndexBusinessManager);
describe('Get function', () => {
});
//# sourceMappingURL=AccIndexBusinessManager.spec.js.map