import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import {BundleQueueBusinessManager} from "../../../app/businessManagers/impl/BundleQueueBusinessManager";

// @ts-ignore
const bundleQueueBusinessManager = container.get<BundleQueueBusinessManager>(TYPES.BundleQueueBusinessManager);

describe('Bundle Queue Business Manager', () => {
    describe('Create function', () => {
        it('should throw error if the new data is missing the ownerKey field', (done) => {
            const data = {bundleId:"1"};
            bundleQueueBusinessManager
                .create(data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if the new data is missing the bundleId field', (done) => {
            const data = {ownerKey: "1"};
            bundleQueueBusinessManager
                .create(data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object\'s user does not exist', (done) => {
            const data = {ownerKey: "1", bundleId: "1"};
            bundleQueueBusinessManager
                .create(data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.notFound('User'));
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });
    });

    describe('Send function', () => {
        it('should throw error if the new data is missing the userInfo field', (done) => {
            const data = {bundleId:"1"};
            bundleQueueBusinessManager
                .send(data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if the new data is missing the bundleId field', (done) => {
            const data = {userInfo: "1"};
            bundleQueueBusinessManager
                .send(data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object\'s user does not exist', (done) => {
            const data = {userInfo: "1", bundleId: "1"};
            bundleQueueBusinessManager
                .send(data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.notFound('User'));
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });

        it('should throw error if new object\'s bundle does not exist', (done) => {
            const data = {userInfo: "WhizzimoAcademy:113", bundleId: "2"};
            bundleQueueBusinessManager
                .send(data)
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.notFound('Bundle'));
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });
    });
});
