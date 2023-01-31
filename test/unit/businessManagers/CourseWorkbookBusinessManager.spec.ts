import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import {CourseWorkbookBusinessManager} from "../../../app/businessManagers/impl/CourseWorkbookBusinessManager";

// @ts-ignore
const courseWorkbookBusinessManager = container.get<CourseWorkbookBusinessManager>(TYPES.CourseWorkbookBusinessManager);

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
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
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
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error)
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
                .catch((error: any) => {
                    try {
                        expect(error).to.equal(Errors.notFound('Course'));
                        done();
                    } catch (error){
                        done(error)
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
                .catch((error: any) => {
                    done(error);
                });
        });
    });

    describe('ValidateOwner Function', () => {
        it('Should validate if request is made by admin', (done) => {
           courseWorkbookBusinessManager
               .validateOwner('1', {admin: true})
               .then(() => {
                   done();
               })
               .catch((error: any) => done(error));
        }) ;

        it('Should fail if courseWorkbook cannot be found', (done) => {
            courseWorkbookBusinessManager
                .validateOwner('13', {admin: false})
                .then(() => {
                    done(new Error('Did not fail.'));
                })
                .catch((error: any) =>{
                    try {
                        expect(error).to.eq(Errors.notAuthorized);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        }) ;

        it('Should fail if course owner doesnt match userId', (done) => {
            courseWorkbookBusinessManager
                .validateOwner('1', {admin: false, userId: 'WhizzimoAcademy:5'})
                .then(() => {
                    done(new Error('Did not fail.'));
                })
                .catch((error: any) =>{
                    try {
                        expect(error).to.eq(Errors.notAuthorized);
                        done();
                    } catch (error){
                        done(error)
                    }
                });
        }) ;

        it('Should fail if course owner is correct', (done) => {
            courseWorkbookBusinessManager
                .validateOwner('1', {admin: false, userId: 'WhizzimoAcademy:1'})
                .then(() => {
                    done();
                })
                .catch((error: any) => {
                    done(error);
                });
        }) ;
    });
});
