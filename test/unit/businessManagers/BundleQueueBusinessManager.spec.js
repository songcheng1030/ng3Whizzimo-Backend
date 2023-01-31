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
const bundleQueueBusinessManager = inversify_base_config_1.default.get(types_1.default.BundleQueueBusinessManager);
describe('Bundle Queue Business Manager', () => {
    describe('Create function', () => {
        it('should throw error if the new data is missing the ownerKey field', (done) => {
            const data = { bundleId: "1" };
            bundleQueueBusinessManager
                .create(data)
                .then(() => {
                done(new Error('Did not fail'));
            })
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
        it('should throw error if the new data is missing the bundleId field', (done) => {
            const data = { ownerKey: "1" };
            bundleQueueBusinessManager
                .create(data)
                .then(() => {
                done(new Error('Did not fail'));
            })
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
        it('should throw error if new object\'s user does not exist', (done) => {
            const data = { ownerKey: "1", bundleId: "1" };
            bundleQueueBusinessManager
                .create(data)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.notFound('User'));
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
    });
    describe('Send function', () => {
        it('should throw error if the new data is missing the userInfo field', (done) => {
            const data = { bundleId: "1" };
            bundleQueueBusinessManager
                .send(data)
                .then(() => {
                done(new Error('Did not fail'));
            })
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
        it('should throw error if the new data is missing the bundleId field', (done) => {
            const data = { userInfo: "1" };
            bundleQueueBusinessManager
                .send(data)
                .then(() => {
                done(new Error('Did not fail'));
            })
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
        it('should throw error if new object\'s user does not exist', (done) => {
            const data = { userInfo: "1", bundleId: "1" };
            bundleQueueBusinessManager
                .send(data)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.notFound('User'));
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if new object\'s bundle does not exist', (done) => {
            const data = { userInfo: "WhizzimoAcademy:113", bundleId: "2" };
            bundleQueueBusinessManager
                .send(data)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.notFound('Bundle'));
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
    });
});
//# sourceMappingURL=BundleQueueBusinessManager.spec.js.map