import chai from 'chai';
import spies from 'chai-spies';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import {BundleBusinessManager} from "../../../app/businessManagers/impl/BundleBusinessManager";

// @ts-ignore
const bundleBusinessManager = container.get<BundleBusinessManager>(TYPES.BundleBusinessManager);

chai.use(spies);

describe('Bundle Business Manager', () => {
    chai.spy.on(bundleBusinessManager, '_bundleDataManager.create', (bundle) => bundle);
    chai.spy.on(bundleBusinessManager, '_userBusinessManager.get', (id) => ({_id: '1'}));
    chai.spy.on(bundleBusinessManager, '_bundleContentBusinessManager.create', (data) => data);
    chai.spy.on(bundleBusinessManager, '_bundleDataManager.delete', (id) => null);
    chai.spy.on(bundleBusinessManager, '_bundleContentBusinessManager.deleteByBundleId', (id) => null);

    describe('Create function', () => {
        it('should throw error if new object is missing the name field', (done) => {
            const newObj:any = {ownerKey: 'TestKey', bundleItems: [], type: 'Test Type'};
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object is missing the ownerKey field', (done) => {
            const newObj:any = {name: 'test', bundleItems: [], type: 'Test Type'};
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object is missing the bundleItems field', (done) => {
            const newObj:any = {name: 'test', ownerKey: 'TestKey', type: 'Test Type'};
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object is missing the types field', (done) => {
            const newObj:any = {name: 'test', ownerKey: 'TestKey', bundleItems: []};
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object has an empty bundle', (done) => {
            const newObj:any = {name: 'test', ownerKey: 'TestKey', bundleItems: [], type: 'Test Type'};
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.noBundleItems);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object has a bundle that is not an array', (done) => {
            const newObj:any = {name: 'test', ownerKey: 'TestKey', bundleItems: {}, type: 'Test Type'};
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.noBundleItems);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object has a non accepted type', (done) => {
            const newObj:any = {name: 'test', ownerKey: 'TestKey', bundleItems: {}, type: 'Test Type'};
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.noBundleItems);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object\'s user does not exist', (done) => {
            const newObj:any = {name: 'test', ownerKey: 'TestKey', bundleItems: ['test value'], type: 'course'};
            bundleBusinessManager
                .create(newObj)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.notFound('User'));
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });
    });

    describe('Update function', () => {
       it('should throw error if the updated object contains the _id field', (done) => {
           const data = {
               "_id" : "2",
               "name" : "test",
           };
           bundleBusinessManager
               .update("1", data)
               .then(() => {
                   done(new Error('Did not fail'));
               })
               .catch((error: any) => {
                   try {
                       chai.expect(error).to.eq(Errors.illegalParameters);
                       done();
                   } catch (error){
                       done(error)
                   }
               });
       });

        it('should throw error if the updated object contains the ownerKey field', (done) => {
            const data = {
                "ownerKey" : "2rert",
                "name" : "test",
            };
            bundleBusinessManager
                .update("1", data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.illegalParameters);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if the updated object contains the code field', (done) => {
            const data = {
                "code" : "dkljsf",
                "name" : "test",
            };
            bundleBusinessManager
                .update("1", data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.illegalParameters);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if the updated object contains the type field', (done) => {
            const data = {
                "type" : "dkljsf",
                "name" : "test",
            };
            bundleBusinessManager
                .update("1", data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.illegalParameters);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });
    });

    describe('ValidateOwner function', () => {
        it('should throw an error the bundle does not exist', (done) => {
            const locals = {userId: "1"};
           bundleBusinessManager
               .validateOwner("2", locals)
               .then(() => {
                   done(new Error('Did not fail'));
               })
               .catch((error: any) => {
                   try {
                       chai.expect(error).to.eq(Errors.notAuthorized);
                       done();
                   } catch (error){
                       done(error)
                   }
               });
        });

        it('should throw an error if the user making the request doesn\'t match the bundle owner', (done) => {
            const locals = {userId: "2"};
            bundleBusinessManager
                .validateOwner("1", locals)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        chai.expect(error).to.eq(Errors.notAuthorized);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });
    });
});

