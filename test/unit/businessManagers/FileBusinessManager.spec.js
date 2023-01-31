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
const fileBusinessManager = inversify_base_config_1.default.get(types_1.default.FileBusinessManager);
describe('File Business Manager', () => {
    describe('Create function', () => {
        it('Should fail if the file field is missing from the data parameter.', (done) => {
            const data = {
                name: 'Test',
                ownerKey: 'WhizzimoAcademy:2',
            };
            fileBusinessManager
                .create(data)
                .then(() => done(Errors_1.Errors.noFailure))
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.missingParametersBody);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('Should fail if the ownerKey field is missing from the data parameter.', (done) => {
            const data = {
                file: {},
                name: 'Test',
            };
            fileBusinessManager
                .create(data)
                .then(() => done(Errors_1.Errors.noFailure))
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.missingParametersBody);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('Should fail if the name field is missing from the data parameter.', (done) => {
            const data = {
                file: {},
                ownerKey: 'test'
            };
            fileBusinessManager
                .create(data)
                .then(() => done(Errors_1.Errors.noFailure))
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.missingParametersBody);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('Should pass if all required fields are available.', (done) => {
            const data = {
                file: {},
                name: 'test',
                ownerKey: 'WhizzimoAcademy:1'
            };
            fileBusinessManager
                .create(data)
                .then(() => done())
                .catch((error) => done(error));
        });
    });
    describe('Validate Owner Function', () => {
        it('Should validate if request is made by admin', (done) => {
            fileBusinessManager
                .validateOwner('1', { admin: true })
                .then(() => {
                done();
            })
                .catch((error) => done(error));
        });
        it('Should fail if courseWorkbook cannot be found', (done) => {
            fileBusinessManager
                .validateOwner('13', { admin: false })
                .then(() => {
                done(new Error('Did not fail.'));
            })
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.notAuthorized);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('Should fail if course owner doesnt match userId', (done) => {
            fileBusinessManager
                .validateOwner('1', { admin: false, userId: 'WhizzimoAcademy:5' })
                .then(() => {
                done(new Error('Did not fail.'));
            })
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.notAuthorized);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('Should pass if course owner is correct', (done) => {
            fileBusinessManager
                .validateOwner('1', { admin: false, userId: 'WhizzimoAcademy:1' })
                .then(() => {
                done();
            })
                .catch((error) => {
                done(error);
            });
        });
    });
});
//# sourceMappingURL=FileBusinessManager.spec.js.map