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
const courseWorkbookBusinessManager = inversify_base_config_1.default.get(types_1.default.CourseWorkbookBusinessManager);
describe('Course Workbook Business Manager', () => {
    describe('Create function', () => {
        it('should fail when request body is missing the workbook key field', (done) => {
            const newObject = {
                _id: "43",
                concept: "new",
                order: 15,
                courseId: "1",
                ownerKey: "WhizzimoAcademy:113"
            };
            courseWorkbookBusinessManager
                .create(newObject)
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
        it('should fail when request body is missing the courseId field', (done) => {
            const newObject = {
                _id: "43",
                concept: "new",
                order: 15,
                workbookId: 'eRES',
                ownerKey: "WhizzimoAcademy:113"
            };
            courseWorkbookBusinessManager
                .create(newObject)
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
        // it('should fail if the workbook for this course workbook cannot be found', (done) => {
        //     const newObject = {
        //         _id: "43",
        //         concept: "new",
        //         order: 15,
        //         workbookId: 'eRES',
        //         courseId: '1',
        //         ownerKey: "WhizzimoAcademy:113"
        //     };
        //
        //     courseWorkbookBusinessManager
        //         .create(newObject)
        //         .then(() => {
        //             done(new Error('Did not fail'));
        //         })
        //         .catch((error: any) => {
        //             try {
        //                 expect(error).to.eq(Errors.notFound('Workbook'));
        //                 done();
        //             } catch (error){
        //                 done(error)
        //             }
        //         });
        // });
        it('should fail if the course for this course workbook cannot be found', (done) => {
            const newObject = {
                _id: "43",
                concept: "new",
                order: 15,
                workbookId: '1',
                courseId: '1434',
                ownerKey: "WhizzimoAcademy:113"
            };
            courseWorkbookBusinessManager
                .create(newObject)
                .then(() => {
                done(new Error('Did not fail'));
            })
                .catch((error) => {
                try {
                    chai_1.expect(error).to.equal(Errors_1.Errors.notFound('Course'));
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
        it('should pass if the course and workbook can be found', (done) => {
            const newObject = {
                _id: "43",
                concept: "new",
                order: 15,
                workbookId: '23DBrUNm0P',
                courseId: '1',
                ownerKey: "WhizzimoAcademy:113"
            };
            courseWorkbookBusinessManager
                .create(newObject)
                .then(() => {
                done();
            })
                .catch((error) => {
                done(error);
            });
        });
    });
    describe('ValidateOwner Function', () => {
        it('Should validate if request is made by admin', (done) => {
            courseWorkbookBusinessManager
                .validateOwner('1', { admin: true })
                .then(() => {
                done();
            })
                .catch((error) => done(error));
        });
        it('Should fail if courseWorkbook cannot be found', (done) => {
            courseWorkbookBusinessManager
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
            courseWorkbookBusinessManager
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
        it('Should fail if course owner is correct', (done) => {
            courseWorkbookBusinessManager
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
//# sourceMappingURL=CourseWorkbookBusinessManager.spec.js.map