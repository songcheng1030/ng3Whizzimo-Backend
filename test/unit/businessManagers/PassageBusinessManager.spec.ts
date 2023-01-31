import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import INameToValueMap from "../../../app/shared/INameToValueMap";
import {PassageBusinessManager} from "../../../app/businessManagers/impl/PassageBusinessManager";

// @ts-ignore
const passageBusinessManager = container.get<PassageBusinessManager>(TYPES.PassageBusinessManager);

describe('Passage Business Manager', () => {
    describe('Create function', () => {
        it('should throw an error if the new object is missing the courseWorkbookId field', (done) => {
            let data:INameToValueMap = {
                ownerKey: 'WhizzimoAcademy:1'
            };

            passageBusinessManager
                .create(data)
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error);
                    }
                });
        });

        it('should throw an error if the new object is missing the courseWorkbookId field', (done) => {
            let data:INameToValueMap = {
                passage: "Test passage. Test passage.",
            };

            passageBusinessManager
                .create(data)
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error);
                    }
                });
        });
    });

    describe('Update function', () => {
       it('should throw an error if the updated object is missing the passage field', (done) => {
            let data:INameToValueMap = {
            };

            passageBusinessManager
                .update('1', data)
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error);
                    }
                });
        });

        it('should throw an error if the updated object is has an ownerKey field', (done) => {
            let data:INameToValueMap = {
                passage: 'Test. Test.',
                ownerKey: 'Whizzimo'
            };

            passageBusinessManager
                .update('1', data)
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.illegalParameters);
                        done();
                    } catch (error){
                        done(error);
                    }
                });
        });
    });

    describe('Validate Owner function', () => {
       it('should throw an error the owner does not match', (done) => {
           passageBusinessManager
               .validateOwner('WhizzimoAcademy:179', {userId: "5"})
               .then(() => done(Errors.noFailure))
               .catch((error: any) => {
                   try {
                       expect(error).to.eq(Errors.notAuthorized);
                       done();
                   } catch (error){
                       done(error);
                   }
               });
       });
    });

    describe('Validate Owner function', () => {
        it('should pass of the ownerkeys match', (done) => {
            passageBusinessManager
                .validateOwner('WhizzimoAcademy:179', {userId: 'WhizzimoAcademy:179'})
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.notAuthorized);
                        done();
                    } catch (error){
                        done(error);
                    }
                });
        });
    });
});
