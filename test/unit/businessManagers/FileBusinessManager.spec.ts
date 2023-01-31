import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import {FileBusinessManager} from "../../../app/businessManagers/impl/FileBusinessManager";

// @ts-ignore
const fileBusinessManager = container.get<FileBusinessManager>(TYPES.FileBusinessManager);

describe('File Business Manager', () => {
    describe('Create function', () => {
        it('Should fail if the file field is missing from the data parameter.', (done) => {
            const data = {
                name: 'Test',
                ownerKey: 'WhizzimoAcademy:2',
            };

            fileBusinessManager
                .create(data)
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
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
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
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
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
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
                .catch((error: any) => done(error));
        });
    });

    describe('Validate Owner Function', () => {
        it('Should validate if request is made by admin', (done) => {
            fileBusinessManager
                .validateOwner('1', {admin: true})
                .then(() => {
                    done();
                })
                .catch((error: any) => done(error));
        }) ;

        it('Should fail if courseWorkbook cannot be found', (done) => {
            fileBusinessManager
                .validateOwner('13', {admin: false})
                .then(() => {
                    done(new Error('Did not fail.'));
                })
                .catch((error: any) =>{
                    try {
                        expect(error).to.eq(Errors.notAuthorized);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        }) ;

        it('Should fail if course owner doesnt match userId', (done) => {
            fileBusinessManager
                .validateOwner('1', {admin: false, userId: 'WhizzimoAcademy:5'})
                .then(() => {
                    done(new Error('Did not fail.'));
                })
                .catch((error: any) =>{
                    try {
                        expect(error).to.eq(Errors.notAuthorized);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        }) ;

        it('Should pass if course owner is correct', (done) => {
            fileBusinessManager
                .validateOwner('1', {admin: false, userId: 'WhizzimoAcademy:1'})
                .then(() => {
                    done();
                })
                .catch((error: any) => {
                    done(error);
                });
        }) ;
    })
});
