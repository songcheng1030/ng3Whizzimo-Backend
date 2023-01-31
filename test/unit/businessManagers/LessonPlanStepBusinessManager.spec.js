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
const lessonPlanStepBusinessManager = inversify_base_config_1.default.get(types_1.default.LessonPlanStepBusinessManager);
describe('Lesson Plan Step Business Manager', () => {
    describe('Create function', () => {
        it('should throw an error if the new object is missing the passage field', (done) => {
            let data = {
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name: 'Test Step',
                words: [],
                tiles: []
            };
            lessonPlanStepBusinessManager
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
        it('should throw an error if the new object is missing the lessonPlanId field', (done) => {
            let data = {
                courseWorkbookId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name: 'Test Step',
                words: [],
                tiles: []
            };
            lessonPlanStepBusinessManager
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
        it('should throw an error if the new object is missing the activity field', (done) => {
            let data = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activityName: 'Spelling',
                name: 'Test Step',
                words: [],
                tiles: []
            };
            lessonPlanStepBusinessManager
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
        it('should throw an error if the new object is missing the activityName field', (done) => {
            let data = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                name: 'Test Step',
                words: [],
                tiles: []
            };
            lessonPlanStepBusinessManager
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
        it('should throw an error if the new object is missing the name field', (done) => {
            let data = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                words: [],
                tiles: []
            };
            lessonPlanStepBusinessManager
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
        it('should throw an error if the new object is missing the words field', (done) => {
            let data = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name: 'Test Step',
                tiles: []
            };
            lessonPlanStepBusinessManager
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
        it('should throw an error if the new object is missing the tiles field', (done) => {
            let data = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name: 'Test Step',
                words: []
            };
            lessonPlanStepBusinessManager
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
        it('should throw an error if the new object has a course Workbook id does not exist', (done) => {
            let data = {
                courseWorkbookId: 21,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name: 'Test Step',
                words: [],
                tiles: []
            };
            lessonPlanStepBusinessManager
                .create(data)
                .then(() => done(Errors_1.Errors.noFailure))
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.notFound('Course Workbook'));
                    done();
                }
                catch (error) {
                    done(error);
                }
            });
        });
    });
});
//# sourceMappingURL=LessonPlanStepBusinessManager.spec.js.map