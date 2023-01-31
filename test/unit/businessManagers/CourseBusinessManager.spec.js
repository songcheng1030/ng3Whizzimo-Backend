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
const courseBusinessManager = inversify_base_config_1.default.get(types_1.default.CourseBusinessManager);
describe('Course Business Manager', () => {
    describe('Copy function', () => {
        it('should throw an error if the course does not exist', (done) => {
            courseBusinessManager
                .copy('3', "WhizzimoAcademy:1")
                .then(() => {
                done(new Error('Did not fail'));
            })
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
    describe('ValidateCourseOwner function', () => {
        it('should return valid if it is an admin', (done) => {
            courseBusinessManager
                .validateCourseOwner('1', 'WhizzimoAcademy:1', true)
                .then(() => {
                done();
            })
                .catch((error) => {
                done(error);
            });
        });
        it('should throw error if owner does not match', (done) => {
            courseBusinessManager
                .validateCourseOwner('1', 'WhizzimoAcademy:13')
                .then(() => {
                done(new Error('Did not fail'));
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
    });
});
//# sourceMappingURL=CourseBusinessManager.spec.js.map