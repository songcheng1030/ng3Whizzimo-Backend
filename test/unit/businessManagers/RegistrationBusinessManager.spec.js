"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("../../../global"));
global_1.default.isTest = true;
const chai_1 = require("chai");
require("mocha");
const randomString = require('randomstring');
const inversify_base_config_1 = __importDefault(require("./../../../inversify.base.config"));
const types_1 = __importDefault(require("../../../types"));
const Errors_1 = require("../../../app/constants/Errors");
// @ts-ignore
const registrationBusinessManager = inversify_base_config_1.default.get(types_1.default.RegistrationBusinessManager);
// @ts-ignore
const studentBusinessManager = inversify_base_config_1.default.get(types_1.default.StudentBusinessManager);
// @ts-ignore
const accIndexBusinesssManager = inversify_base_config_1.default.get(types_1.default.AccIndexBusinessManager);
// @ts-ignore
const courseBusinessManager = inversify_base_config_1.default.get(types_1.default.CourseBusinessManager);
describe('Registration Business Manager', () => {
    describe('Registration function', () => {
        it('should fail if the registration object is missing the firstName Field', (done) => {
            const newUser = {
                firstName: null,
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: '1000 workbooks',
                role: 'teacher',
                username: 'test',
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
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
        it('should fail if the registration object is missing the lastName Field', (done) => {
            const newUser = {
                firstName: 'Test',
                lastName: null,
                email: 'tlastname@test.com',
                password: 'password',
                plan: '1000 workbooks',
                role: 'teacher',
                username: 'test',
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
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
        it('should fail if the registration object is missing the email Field', (done) => {
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: null,
                password: 'password',
                plan: '1000 workbooks',
                role: 'teacher',
                username: 'test',
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
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
        it('should fail if the registration object is missing the password Field', (done) => {
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: null,
                plan: '1000 workbooks',
                role: 'teacher',
                username: 'test',
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
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
        it('should fail if the registration object is missing the plan Field', (done) => {
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: null,
                role: 'teacher',
                username: 'test',
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
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
        it('should fail if the registration object is missing the role Field', (done) => {
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: '1000 workbooks',
                role: null,
                username: 'test',
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
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
        it('should fail if the registration object is missing the username Field', (done) => {
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: '1000 workbooks',
                role: 'teacher',
                username: null,
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
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
        it('should pass if only non required fields are missing', (done) => {
            const username = randomString.generate({ length: 6, charset: 'alphanumeric' });
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: 'demo_5s_300wkbks',
                role: 'teacher',
                username: username,
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
                .then(() => done())
                .catch((error) => done(error));
        });
        it('should have a response object that contains the auth0Id, whizzimoId, and customerId fields', (done) => {
            const username = randomString.generate({ length: 6, charset: 'alphanumeric' });
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: 'demo_5s_300wkbks',
                role: 'teacher',
                username: username,
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
                .then((result) => {
                chai_1.expect(result.data.auth0Id).to.exist;
                chai_1.expect(result.data.whizzimoId).to.exist;
                chai_1.expect(result.data.stripeId).to.exist;
                done();
            })
                .catch((error) => done(error));
        });
        it('should create a student object if the teacher field is not empty', (done) => {
            const username = randomString.generate({ length: 6, charset: 'alphanumeric' });
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: 'demo_5s_300wkbks',
                role: 'teacher',
                username: username,
                promo: null,
                code: null,
                codeDesc: null,
                teacher: '1'
            };
            registrationBusinessManager
                .register(newUser)
                .then((result) => {
                return studentBusinessManager.get(result.data.whizzimoId);
            })
                .then((result) => {
                chai_1.expect(result).to.exist;
                done();
            })
                .catch((error) => done(error));
        });
        it('should increment accIndex if successful', (done) => {
            const username = randomString.generate({ length: 6, charset: 'alphanumeric' });
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: 'demo_5s_300wkbks',
                role: 'teacher',
                username: username,
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            let currIndex = 0;
            accIndexBusinesssManager
                .get()
                .then((result) => {
                currIndex = result;
                return registrationBusinessManager.register(newUser);
            })
                .then(() => {
                return accIndexBusinesssManager.get();
            })
                .then((result) => {
                chai_1.expect(result.accIndex).to.be.greaterThan(0);
                done();
            })
                .catch((error) => done(error));
        });
        it('should create a course if the new user is a teacher', (done => {
            const username = randomString.generate({ length: 6, charset: 'alphanumeric' });
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: 'demo_5s_300wkbks',
                role: 'Teacher',
                username: username,
                promo: null,
                code: null,
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
                .then((result) => courseBusinessManager.getMany(result.data.whizzimoId))
                .then((result) => {
                chai_1.expect(result.length).to.be.greaterThan(0);
                done();
            })
                .catch((error) => done(error));
        }));
        it('should not create a course if the new user is a student', (done => {
            const username = randomString.generate({ length: 6, charset: 'alphanumeric' });
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: 'Student',
                role: 'Student',
                username: username,
                promo: null,
                code: null,
                codeDesc: null,
                teacher: 'WhizzimoAcademy:8'
            };
            registrationBusinessManager
                .register(newUser)
                .then((result) => courseBusinessManager.getMany(result.data.whizzimoId))
                .then((result) => {
                chai_1.expect(result.length).to.equal(0);
                done();
            })
                .catch((error) => done(error));
        }));
        it('should add referral code to social media message if there is a code in the request', (done => {
            const username = randomString.generate({ length: 6, charset: 'alphanumeric' });
            const newUser = {
                firstName: 'Test',
                lastName: 'Lastname',
                email: 'tlastname@test.com',
                password: 'password',
                plan: 'demo_5s_300wkbks',
                role: 'Teacher',
                username: username,
                promo: null,
                code: '100 percent',
                codeDesc: null,
                teacher: null
            };
            registrationBusinessManager
                .register(newUser)
                .then((result) => {
                chai_1.expect(result.data.socialMediaMessage).to.contain('using referral code');
                done();
            })
                .catch((error) => done(error));
        }));
    });
});
//# sourceMappingURL=RegistrationBusinessManager.spec.js.map