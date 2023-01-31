import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import INameToValueMap from "../../../app/shared/INameToValueMap";
import {LessonPlanStepBusinessManager} from "../../../app/businessManagers/impl/LessonPlanStepBusinessManager";

// @ts-ignore
const lessonPlanStepBusinessManager = container.get<LessonPlanStepBusinessManager>(TYPES.LessonPlanStepBusinessManager);

describe('Lesson Plan Step Business Manager', () => {
    describe('Create function', () => {
       it('should throw an error if the new object is missing the passage field', (done) => {
           let data:INameToValueMap = {
               lessonPlanId: 1,
               activity: 'Spelling',
               activityName: 'Spelling',
               name:'Test Step',
               words: [],
               tiles: []
           };

           lessonPlanStepBusinessManager
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

        it('should throw an error if the new object is missing the lessonPlanId field', (done) => {
            let data:INameToValueMap = {
                courseWorkbookId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name:'Test Step',
                words: [],
                tiles: []
            };

            lessonPlanStepBusinessManager
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

        it('should throw an error if the new object is missing the activity field', (done) => {
            let data:INameToValueMap = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activityName: 'Spelling',
                name:'Test Step',
                words: [],
                tiles: []
            };

            lessonPlanStepBusinessManager
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

        it('should throw an error if the new object is missing the activityName field', (done) => {
            let data:INameToValueMap = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                name:'Test Step',
                words: [],
                tiles: []
            };

            lessonPlanStepBusinessManager
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

        it('should throw an error if the new object is missing the name field', (done) => {
            let data:INameToValueMap = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                words: [],
                tiles: []
            };

            lessonPlanStepBusinessManager
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

        it('should throw an error if the new object is missing the words field', (done) => {
            let data:INameToValueMap = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name:'Test Step',
                tiles: []
            };

            lessonPlanStepBusinessManager
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

        it('should throw an error if the new object is missing the tiles field', (done) => {
            let data:INameToValueMap = {
                courseWorkbookId: 1,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name:'Test Step',
                words: []
            };

            lessonPlanStepBusinessManager
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

        it('should throw an error if the new object has a course Workbook id does not exist', (done) => {
            let data:INameToValueMap = {
                courseWorkbookId: 21,
                lessonPlanId: 1,
                activity: 'Spelling',
                activityName: 'Spelling',
                name:'Test Step',
                words: [],
                tiles: []
            };

            lessonPlanStepBusinessManager
                .create(data)
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.notFound('Course Workbook'));
                        done();
                    } catch (error){
                        done(error);
                    }
                });
        });
    });
});
