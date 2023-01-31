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
const lessonPlanBusinessManager = inversify_base_config_1.default.get(types_1.default.LessonPlanBusinessManager);
describe('Lesson Plan Business Manager', () => {
    describe('Create function', () => {
        it('should throw an error if the new object is missing the courseId field.', (done) => {
            let data = {
                order: 0,
                name: "Lesson Plan on Monday, December 11, 2017",
                notes: "",
                status: "teaching"
            };
            lessonPlanBusinessManager
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
        it('should throw an error if the new object is missing the name field.', (done) => {
            let data = {
                order: 0,
                courseId: "1",
                notes: "",
                status: "teaching"
            };
            lessonPlanBusinessManager
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
        it('should throw an error if the course the lesson plan belongs to does not exist', (done) => {
            let data = {
                order: 0,
                courseId: "31",
                name: "New Lesson Plan",
                notes: "",
                status: "teaching"
            };
            lessonPlanBusinessManager
                .create(data)
                .then(() => done(Errors_1.Errors.noFailure))
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.notFound('Course'));
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
    });
    describe('Update function', () => {
        it('should throw an error if the courseId parameter is a part of the updated object', (done) => {
            let data = {
                order: 0,
                courseId: "1",
                name: "Lesson Plan on Sunday, March 20, 2016",
                notes: "Tap here to type a few notes in this Lesson Plan",
                status: "draft"
            };
            lessonPlanBusinessManager
                .update("1", data)
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
    describe('Validate Course Owner function', () => {
        // it('Should validate if request is made by admin', (done) => {
        //     lessonPlanBusinessManager
        //         .validateCourseOwner('1', {admin: true})
        //         .then(() => {
        //             done();
        //         })
        //         .catch((error: any) => done(error));
        // }) ;
        // it('Should fail if course owner doesnt match userId', (done) => {
        //     lessonPlanBusinessManager
        //         .validateCourseOwner('1', {admin: false, userId: 'WhizzimoAcademy:5'})
        //         .then(() => {
        //             done(new Error('Did not fail.'));
        //         })
        //         .catch((error: any) =>{
        //             try {
        //                 expect(error).to.eq(Errors.notAuthorized);
        //                 done();
        //             } catch (error){
        //                 done(error)
        //             }
        //         });
        // }) ;
        // it('Should pass if course owner is correct', (done) => {
        //     lessonPlanBusinessManager
        //         .validateCourseOwner('1', {admin: false, userId: 'WhizzimoAcademy:1'})
        //         .then(() => {
        //             done();
        //         })
        //         .catch((error: any) => {
        //             done(error);
        //         });
        // }) ;
    });
    describe('Validate Owner function', () => {
        it('Should validate if request is made by admin', (done) => {
            lessonPlanBusinessManager
                .validateOwner('1', { admin: true })
                .then(() => {
                done();
            })
                .catch((error) => done(error));
        });
        it('Should fail if course owner doesnt match userId', (done) => {
            lessonPlanBusinessManager
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
            lessonPlanBusinessManager
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
//# sourceMappingURL=LessonPlanBusinessManager.spec.js.map