import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import {CourseBusinessManager} from "../../../app/businessManagers/impl/CourseBusinessManager";

// @ts-ignore
const courseBusinessManager = container.get<CourseBusinessManager>(TYPES.CourseBusinessManager);

describe('Course Business Manager', () => {
    describe('Copy function', () => {
        it('should throw an error if the course does not exist', (done) => {
            courseBusinessManager
                .copy('3', "WhizzimoAcademy:1")
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.notFound('Course'));
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });
    });

    describe('ValidateCourseOwner function', () => {
        it('should return valid if it is an admin', (done) => {
            courseBusinessManager
                .validateCourseOwner('1', 'WhizzimoAcademy:1', true)
                .then(() => {
                    done();
                })
                .catch((error: any) => {
                    done(error);
                });
        });

        it('should throw error if owner does not match', (done) => {
            courseBusinessManager
                .validateCourseOwner('1', 'WhizzimoAcademy:13')
                .then(() => {
                    done(new Error('Did not fail'));
                })
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.notAuthorized);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        });
    });
});
