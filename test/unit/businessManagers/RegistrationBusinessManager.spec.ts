import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
const randomString = require('randomstring');
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import {RegistrationBusinessManager} from "../../../app/businessManagers/impl/RegistrationBusinessManager";
import RegistrationRequest from "../../../app/models/RegistrationRequest";
import {StudentBusinessManager} from "../../../app/businessManagers/impl/StudentBusinessManager";
import {AccIndexBusinessManager} from "../../../app/businessManagers/impl/AccIndexBusinessManager";
import {CourseBusinessManager} from "../../../app/businessManagers/impl/CourseBusinessManager";

// @ts-ignore
const registrationBusinessManager = container.get<RegistrationBusinessManager>(TYPES.RegistrationBusinessManager);
// @ts-ignore
const studentBusinessManager = container.get<StudentBusinessManager>(TYPES.StudentBusinessManager);
// @ts-ignore
const accIndexBusinesssManager = container.get<AccIndexBusinessManager>(TYPES.AccIndexBusinessManager);
// @ts-ignore
const courseBusinessManager = container.get<CourseBusinessManager>(TYPES.CourseBusinessManager);

describe('Registration Business Manager', () => {
    describe('Registration function', () => {
        it('should fail if the registration object is missing the firstName Field', (done) => {
           const newUser:RegistrationRequest = {
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
           } ;

           registrationBusinessManager
               .register(newUser)
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

        it('should fail if the registration object is missing the lastName Field', (done) => {
            const newUser:RegistrationRequest = {
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
            } ;

            registrationBusinessManager
                .register(newUser)
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

        it('should fail if the registration object is missing the email Field', (done) => {
            const newUser:RegistrationRequest = {
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
            } ;

            registrationBusinessManager
                .register(newUser)
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

        it('should fail if the registration object is missing the password Field', (done) => {
            const newUser:RegistrationRequest = {
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
            } ;

            registrationBusinessManager
                .register(newUser)
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

        it('should fail if the registration object is missing the plan Field', (done) => {
            const newUser:RegistrationRequest = {
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
            } ;

            registrationBusinessManager
                .register(newUser)
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

        it('should fail if the registration object is missing the role Field', (done) => {
            const newUser:RegistrationRequest = {
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
            } ;

            registrationBusinessManager
                .register(newUser)
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

        it('should fail if the registration object is missing the username Field', (done) => {
            const newUser:RegistrationRequest = {
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
            } ;

            registrationBusinessManager
                .register(newUser)
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

        it('should pass if only non required fields are missing', (done) => {
            const username = randomString.generate({length: 6, charset: 'alphanumeric'});

            const newUser:RegistrationRequest = {
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
            } ;

            registrationBusinessManager
                .register(newUser)
                .then(() => done())
                .catch((error: any) => done(error));
        });

        it('should have a response object that contains the auth0Id, whizzimoId, and customerId fields', (done) => {
            const username = randomString.generate({length: 6, charset: 'alphanumeric'});

            const newUser:RegistrationRequest = {
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
            } ;

            registrationBusinessManager
                .register(newUser)
                .then((result: any) => {
                    expect(result.data.auth0Id).to.exist;
                    expect(result.data.whizzimoId).to.exist;
                    expect(result.data.stripeId).to.exist;
                    done();
                })
                .catch((error: any) => done(error));
        });

        it('should create a student object if the teacher field is not empty', (done) => {
            const username = randomString.generate({length: 6, charset: 'alphanumeric'});

            const newUser:RegistrationRequest = {
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
            } ;

            registrationBusinessManager
                .register(newUser)
                .then((result: any) => {
                    return studentBusinessManager.get(result.data.whizzimoId);
                })
                .then((result: any) => {
                    expect(result).to.exist;
                    done();
                })
                .catch((error: any) => done(error));
        });

        it('should increment accIndex if successful', (done) => {
            const username = randomString.generate({length: 6, charset: 'alphanumeric'});

            const newUser:RegistrationRequest = {
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
                .then((result: any) => {
                    currIndex = result;
                    return registrationBusinessManager.register(newUser)
                })
                .then(() => {
                    return accIndexBusinesssManager.get();
                })
                .then((result: any) => {
                    expect(result.accIndex).to.be.greaterThan(0);
                    done();
                })
                .catch((error: any) => done(error));
        });

        it('should create a course if the new user is a teacher', (done => {
            const username = randomString.generate({length: 6, charset: 'alphanumeric'});

            const newUser:RegistrationRequest = {
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
                .then((result: any) => courseBusinessManager.getMany(result.data.whizzimoId))
                .then((result: any[]) => {
                    expect(result.length).to.be.greaterThan(0);
                    done();
                })
                .catch((error: any) => done(error));
        }));

        it('should not create a course if the new user is a student', (done => {
            const username = randomString.generate({length: 6, charset: 'alphanumeric'});

            const newUser:RegistrationRequest = {
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
                .then((result: any) => courseBusinessManager.getMany(result.data.whizzimoId))
                .then((result: any[]) => {
                    expect(result.length).to.equal(0);
                    done();
                })
                .catch((error: any) => done(error));
        }));

        it('should add referral code to social media message if there is a code in the request', (done => {
            const username = randomString.generate({length: 6, charset: 'alphanumeric'});

            const newUser:RegistrationRequest = {
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
                .then((result: any) => {
                    expect(result.data.socialMediaMessage).to.contain('using referral code');
                    done();
                })
                .catch((error: any) => done(error));
        }));


    });
});
