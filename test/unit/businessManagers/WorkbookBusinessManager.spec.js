"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("../../../global"));
global_1.default.isTest = true;
const chai_1 = require("chai");
require("mocha");
const inversify_base_config_1 = __importDefault(require("./../../../inversify.base.config"));
const types_1 = __importDefault(require("../../../types"));
const Errors_1 = require("../../../app/constants/Errors");
// @ts-ignore
const workbookBusinessManager = inversify_base_config_1.default.get(types_1.default.WorkbookBusinessManager);
describe('Workbook Business Manager', () => {
    describe('Update function', () => {
        it('should fail if there is owner field is in the data object', (done) => {
            const newWorkbook = {
                "owner": "WhizzimoAcademy:14",
                "ownerName": "Eric Smallwood2",
            };
            workbookBusinessManager
                .update('2', newWorkbook)
                .then(() => done(Errors_1.Errors.noFailure))
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.illegalParameters);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
    });
});
//# sourceMappingURL=WorkbookBusinessManager.spec.js.map