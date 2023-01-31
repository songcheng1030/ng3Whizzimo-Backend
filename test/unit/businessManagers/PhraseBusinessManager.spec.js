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
const phraseBusinessManager = inversify_base_config_1.default.get(types_1.default.PhraseBusinessManager);
describe('Phrase Business Manager', () => {
    describe('Create function', () => {
        it('should throw an error if the new object is missing the courseWorkbookId field', (done) => {
            let data = {
                ownerKey: 'WhizzimoAcademy:1'
            };
            phraseBusinessManager
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
        it('should throw an error if the new object is missing the courseWorkbookId field', (done) => {
            let data = {
                phrase: "Test phrase. Test phrase.",
            };
            phraseBusinessManager
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
    });
    describe('Update function', () => {
        it('should throw an error if the updated object is missing the phrase field', (done) => {
            let data = {};
            phraseBusinessManager
                .update('1', data)
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
        it('should throw an error if the updated object is has an ownerKey field', (done) => {
            let data = {
                phrase: 'Test. Test.',
                ownerKey: 'Whizzimo'
            };
            phraseBusinessManager
                .update('1', data)
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
    describe('Validate Owner function', () => {
        it('should throw an error the owner does not match', (done) => {
            phraseBusinessManager
                .validateOwner('WhizzimoAcademy:179', { userId: "5" })
                .then(() => done(Errors_1.Errors.noFailure))
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
    });
    describe('Validate Owner function', () => {
        it('should pass of the ownerkeys match', (done) => {
            phraseBusinessManager
                .validateOwner('WhizzimoAcademy:179', { userId: 'WhizzimoAcademy:179' })
                .then(() => done(Errors_1.Errors.noFailure))
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
    });
});
//# sourceMappingURL=PhraseBusinessManager.spec.js.map