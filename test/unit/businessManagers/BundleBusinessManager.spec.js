"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_spies_1 = __importDefault(require("chai-spies"));
require("mocha");
const inversify_base_config_1 = __importDefault(require("./../../../inversify.base.config"));
const types_1 = __importDefault(require("../../../types"));
const Errors_1 = require("../../../app/constants/Errors");
// @ts-ignore
const bundleBusinessManager = inversify_base_config_1.default.get(types_1.default.BundleBusinessManager);
chai_1.default.use(chai_spies_1.default);
describe('Bundle Business Manager', () => {
    chai_1.default.spy.on(bundleBusinessManager, '_bundleDataManager.create', (bundle) => bundle);
    chai_1.default.spy.on(bundleBusinessManager, '_userBusinessManager.get', (id) => ({ _id: '1' }));
    chai_1.default.spy.on(bundleBusinessManager, '_bundleContentBusinessManager.create', (data) => data);
    chai_1.default.spy.on(bundleBusinessManager, '_bundleDataManager.delete', (id) => null);
    chai_1.default.spy.on(bundleBusinessManager, '_bundleContentBusinessManager.deleteByBundleId', (id) => null);
    describe('Create function', () => {
        it('should throw error if new object is missing the name field', (done) => {
            const newObj = { ownerKey: 'TestKey', bundleItems: [], type: 'Test Type' };
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.missingParametersBody);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if new object is missing the ownerKey field', (done) => {
            const newObj = { name: 'test', bundleItems: [], type: 'Test Type' };
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.missingParametersBody);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if new object is missing the bundleItems field', (done) => {
            const newObj = { name: 'test', ownerKey: 'TestKey', type: 'Test Type' };
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.missingParametersBody);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if new object is missing the types field', (done) => {
            const newObj = { name: 'test', ownerKey: 'TestKey', bundleItems: [] };
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.missingParametersBody);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if new object has an empty bundle', (done) => {
            const newObj = { name: 'test', ownerKey: 'TestKey', bundleItems: [], type: 'Test Type' };
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.noBundleItems);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if new object has a bundle that is not an array', (done) => {
            const newObj = { name: 'test', ownerKey: 'TestKey', bundleItems: {}, type: 'Test Type' };
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.noBundleItems);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if new object has a non accepted type', (done) => {
            const newObj = { name: 'test', ownerKey: 'TestKey', bundleItems: {}, type: 'Test Type' };
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.noBundleItems);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if new object\'s user does not exist', (done) => {
            const newObj = { name: 'test', ownerKey: 'TestKey', bundleItems: ['test value'], type: 'course' };
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.notFound('User'));
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
    });
    describe('Update function', () => {
        it('should throw error if the updated object contains the _id field', (done) => {
            const data = {
                "_id": "2",
                "name": "test",
            };
            bundleBusinessManager
                .update("1", data)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.illegalParameters);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if the updated object contains the ownerKey field', (done) => {
            const data = {
                "ownerKey": "2rert",
                "name": "test",
            };
            bundleBusinessManager
                .update("1", data)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.illegalParameters);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if the updated object contains the code field', (done) => {
            const data = {
                "code": "dkljsf",
                "name": "test",
            };
            bundleBusinessManager
                .update("1", data)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.illegalParameters);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw error if the updated object contains the type field', (done) => {
            const data = {
                "type": "dkljsf",
                "name": "test",
            };
            bundleBusinessManager
                .update("1", data)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.illegalParameters);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
    });
    describe('ValidateOwner function', () => {
        it('should throw an error the bundle does not exist', (done) => {
            const locals = { userId: "1" };
            bundleBusinessManager
                .validateOwner("2", locals)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.notAuthorized);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should throw an error if the user making the request doesn\'t match the bundle owner', (done) => {
            const locals = { userId: "2" };
            bundleBusinessManager
                .validateOwner("1", locals)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.default.expect(error).to.eq(Errors_1.Errors.notAuthorized);
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
    });
});
//# sourceMappingURL=BundleBusinessManager.spec.js.map