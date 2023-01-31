import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import INameToValueMap from "../../../app/shared/INameToValueMap";
import {SentenceBusinessManager} from "../../../app/businessManagers/impl/SentenceBusinessManager";

// @ts-ignore
const sentenceBusinessManager = container.get<SentenceBusinessManager>(TYPES.SentenceBusinessManager);

describe('Sentence Business Manager', () => {
    describe('Create function', () => {
        it('should throw an error if the new object is missing the courseWorkbookId field', (done) => {
            let data:INameToValueMap = {
                ownerKey: 'WhizzimoAcademy:1'
            };

            sentenceBusinessManager
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
                sentence: "Test sentence. Test sentence.",
            };

            sentenceBusinessManager
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
        it('should throw an error if the updated object is missing the sentence field', (done) => {
            let data:INameToValueMap = {
            };

            sentenceBusinessManager
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
                sentence: 'Test. Test.',
                ownerKey: 'Whizzimo'
            };

            sentenceBusinessManager
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
            sentenceBusinessManager
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
            sentenceBusinessManager
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
