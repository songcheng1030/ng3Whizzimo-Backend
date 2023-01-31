import ILessonPlanBusinessManager from "../ILessonPlanBusinessManager";
import {inject, injectable} from "inversify";
import getDecorators from "inversify-inject-decorators";
import inversifyBaseConfig from '../../../inversify.base.config';
import ILessonPlanDataManager from "../../dataManagers/ILessonPlanDataManager";
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";
import ICourseBusinessManager from "../ICourseBusinessManager";
import {course} from "../../db";
import IBundleContentBusinessManager from "../IBundleContentBusinessManager";
import ILessonPlanStepBusinessManager from "../ILessonPlanStepBusinessManager";

@injectable()
class LessonPlanBusinessManager implements ILessonPlanBusinessManager {
    private _lessonPlanDataManager: ILessonPlanDataManager;
    private _bundleContentBusinessManager: IBundleContentBusinessManager;
    private _lessonPlanStepBusinessManager:ILessonPlanStepBusinessManager;

    constructor(
        @inject(TYPES.LessonPlanDataManager) lessonPlanDataManager:ILessonPlanDataManager,
        @inject(TYPES.BundleContentBusinessManager) bundleContentBusinessManager:IBundleContentBusinessManager,
        @inject(TYPES.LessonPlanStepBusinessManager) lessonPlanStepBusinessManager:ILessonPlanStepBusinessManager
    ) {
        this._lessonPlanDataManager = lessonPlanDataManager;
        this._bundleContentBusinessManager = bundleContentBusinessManager;
        this._lessonPlanStepBusinessManager = lessonPlanStepBusinessManager;
    }

    createLessonPlanStep(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteLessonPlanStep(lessonPlanId: string, lessonPlanStepId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateLessonPlanStep(id: string, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.courseId || !data.name) {
                return reject(Errors.missingParametersBody);
            }

            this._lessonPlanDataManager.create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error))
        }) ;
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._lessonPlanStepBusinessManager.delete(id)
                .then(() => {
                    return this._bundleContentBusinessManager.deleteByContentId(id)
                })
                .then(() => {
                    return this._lessonPlanDataManager.delete(id)
                })
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    get(id: string): Promise<any> {
        return this._lessonPlanDataManager.get(id);
    }

    getMany(courseId: string): Promise<any> {
        return this._lessonPlanDataManager.getMany(courseId);
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            delete data.courseId;
            delete data._id;

            this._lessonPlanDataManager
                .update(id, data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    copy(lessonPlanId:string, newCourseId:string, courseWorkbooks:any[], ownerKey:string, changeName:boolean) {
        return new Promise((resolve, reject) => {
            let newLessonPlan:any;
            this._lessonPlanDataManager
                .get(lessonPlanId)
                .then(lessonPlan => {
                    lessonPlan.oldId = lessonPlan._id;
                    delete lessonPlan._id;

                    if(changeName) lessonPlan.name += " (copy)";
                    if(newCourseId) lessonPlan.courseId = newCourseId;

                    lessonPlan.ownerKey = ownerKey = ownerKey || lessonPlan.ownerKey;


                    return this._lessonPlanDataManager.create(lessonPlan);
                })
                .then(nlp => {
                    newLessonPlan = nlp;
                    return this._lessonPlanStepBusinessManager.getManyIds(lessonPlanId)
                })
                .then(lessonPlanIds => {

                    let requests = lessonPlanIds.map((id:any) => {
                        return this._lessonPlanStepBusinessManager.copy(
                            id._id,
                            newLessonPlan._id,
                            newCourseId || newLessonPlan.courseId,
                            courseWorkbooks,
                            ownerKey,
                            false
                        );
                    });

                    return Promise.all(requests);
                })
                .then(() => this._lessonPlanStepBusinessManager.getMany(newLessonPlan._id))
                .then((lessonPlanSteps) => {
                    newLessonPlan.lessonPlanSteps = lessonPlanSteps;
                    resolve(newLessonPlan);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    validateOwner(lessonPlanId: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) =>  {
            if(locals.admin) {
                return resolve(null);
            }

            this._lessonPlanDataManager
                .get(lessonPlanId)
                .then((result: any) => {
                    if(!result || result.ownerKey !== locals.userId) {
                        throw(Errors.notAuthorized)
                    }

                    return resolve('OK');
                })
                .catch((error: any) => reject(error));
        })
    }

    protectedDelete(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => {
                    return this.delete(id)
                })
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    protectedUpdate(id: string, data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // get lesson plan so that we can check the owner of the course
            this._lessonPlanDataManager
                .get(id)
                .then((result: any) => this.validateOwner(id, locals))
                .then(() => this.update(id, data))
                .then((result: any) => resolve(result))
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    deleteByCourseId(courseId: string): Promise<any> {
        return this._lessonPlanDataManager.deleteByCourseId(courseId);
    }


    getManyIds(courseId: string): Promise<any> {
        return this._lessonPlanDataManager.getManyIds(courseId);
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data.ownerKey = locals.userId;
            this.create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    getManyWithSteps(courseId: string): Promise<any> {
        return this._lessonPlanDataManager.getManyWithSteps(courseId);
    }

    getFirstLessonPlanStep(lessonPlanId: string): Promise<any> {
        return this._lessonPlanDataManager.getFirstLessonPlanStep(lessonPlanId);
    }

}

export {LessonPlanBusinessManager};
