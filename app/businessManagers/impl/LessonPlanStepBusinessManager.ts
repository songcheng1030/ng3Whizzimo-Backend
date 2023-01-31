import ILessonPlanStepBusinessManager from "../ILessonPlanStepBusinessManager";
import ILessonPlanStepDataManager from "../../dataManagers/ILessonPlanStepDataManager";
import ICourseBusinessManager from "../ICourseBusinessManager";
import {inject, injectable, LazyServiceIdentifer} from "inversify";
import getDecorators from "inversify-inject-decorators";
import inversifyBaseConfig from '../../../inversify.base.config';
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";
import ICourseWorkbookBusinessManager from "../ICourseWorkbookBusinessManager";
import {CourseWorkbookBusinessManager} from "./CourseWorkbookBusinessManager";
import {Course} from "../../models/course";
import {workbook} from "../../db";
import ICourseWorkbookDataManager from "../../dataManagers/ICourseWorkbookDataManager";

@injectable()
class LessonPlanStepBusinessManager implements ILessonPlanStepBusinessManager {
    private _lessonPlanStepDataManager:ILessonPlanStepDataManager;
    private _courseWorkbookDataManager:ICourseWorkbookDataManager;



    constructor(
        @inject(TYPES.LessonPlanStepDataManager) lessonPlanStepDataManager:ILessonPlanStepDataManager,
        @inject(new LazyServiceIdentifer(() => TYPES.CourseWorkbookDataManager)) courseWorkbookDataManager:ICourseWorkbookDataManager
    ){
        this._lessonPlanStepDataManager = lessonPlanStepDataManager;
        this._courseWorkbookDataManager = courseWorkbookDataManager;
    }

    copy(lessonPlanStepId: string, newLessonPlanId: string, courseId: string, courseWorkbooks: any[], ownerKey: string, changeName:boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            this._lessonPlanStepDataManager.get(lessonPlanStepId)
                .then(lessonPlanStep => {
                    delete lessonPlanStep._id;

                    if(changeName && lessonPlanStep.name) lessonPlanStep.name += " (copy)";
                    if(courseId) lessonPlanStep.courseId = courseId;
                    if(newLessonPlanId) lessonPlanStep.lessonPlanId = newLessonPlanId;

                    lessonPlanStep.ownerKey = ownerKey;

                    if(courseWorkbooks.length > 0) {
                        let matchedCourseWorkbook = courseWorkbooks.find(courseWkbk => {
                            return courseWkbk.oldId.toString() === lessonPlanStep.courseWorkbookId.toString()
                        });
                        lessonPlanStep.workbookId = matchedCourseWorkbook.workbookId;
                        lessonPlanStep.courseWorkbookId = matchedCourseWorkbook._id;
                    }

                    return this._lessonPlanStepDataManager.create(lessonPlanStep);
                })
                .then(() => resolve('OK'))
                .catch((error: any) => reject(error));
        });
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!data.courseWorkbookId
                || !data.lessonPlanId
                // || !data.activity
                || !data.activityName
                || !data.words
                || !data.tiles) {
                return reject(Errors.missingParametersBody);
            }

            this._courseWorkbookDataManager
                .get(data.courseWorkbookId)
                .then((result: any) => {
                    if (!result) {
                        return reject(Errors.notFound('Course Workbook'));
                    }

                    // add these properties to the body for ease of deletion
                    data.courseId = result.courseId;
                    data.workbookId = result.workbookId;

                    return this._lessonPlanStepDataManager.create(data);
                })
                .then((result: any) => {
                    if (!result) {
                        return reject(Errors.notFound('Lesson Plan'));
                    }

                    return resolve(result);
                })
                .catch((error: any) => {
                    return reject(error)
                });
        });
    }

    delete(id: string): Promise<any> {
        return this._lessonPlanStepDataManager.delete(id);
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._lessonPlanStepDataManager
                .get(id)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._lessonPlanStepDataManager
                .getMany(id)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            delete data.lessonPlanId;
            delete data._id;

            this._lessonPlanStepDataManager
                .update(id, data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    updateFilesByWorkbookId(workbookId: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._lessonPlanStepDataManager
                .updateFilesByWorkbookId(workbookId, data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }
    
    validateOwner(lessonPlanStepId: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) =>  {
            if(locals.admin) {
                return resolve(null);
            }

            this._lessonPlanStepDataManager
                .get(lessonPlanStepId)
                .then((result: any) => {
                    if(!result || result.ownerKey !== locals.userId) {
                        return reject(Errors.notAuthorized)
                    }
                    return resolve('OK');
                })
                .catch((error: any) => reject(error));
        })
    }

    protectedDelete(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._lessonPlanStepDataManager
                .get(id)
                .then((result: any) => this.validateOwner(result._id, locals))
                .then(() => this.delete(id))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    protectedUpdate(id: string, data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._lessonPlanStepDataManager
                .get(id)
                .then((result: any) => this.validateOwner(result._id, locals))
                .then(() => this.update(id, data))
                .then((result: any) => resolve(result))
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data.ownerKey = locals.userId;
            this.create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    deleteByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        return this._lessonPlanStepDataManager.deleteByCourseWorkbookId(courseWorkbookId);
    }

    deleteByWorkbookId(workbookId: string): Promise<any> {
        return this._lessonPlanStepDataManager.deleteByWorkbookId(workbookId);
    }

    deleteByCourseId(courseId: string): Promise<any> {
        return this._lessonPlanStepDataManager.deleteByCourseId(courseId);
    }

    deleteByLessonPlanId(lessonPlanId: string): Promise<any> {
        return this._lessonPlanStepDataManager.deleteByLessonPlanId(lessonPlanId);
    }

    getManyIds(id: string): Promise<any> {
        return this._lessonPlanStepDataManager.getManyIds(id);
    }

    getCountByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        return this._lessonPlanStepDataManager.getCountByCourseWorkbookId(courseWorkbookId);
    }

    getCountByWorkbookId(workbookId: string): Promise<any> {
        return this._lessonPlanStepDataManager.getCountByWorkbookId(workbookId);
    }

    async updateMany(lessonPlanSteps: any[]): Promise<any> {
        let results = [];
        for(let i = 0; i < lessonPlanSteps.length; i++) {
            const lessonPlanStep: any = lessonPlanSteps[i];
            if(lessonPlanStep) {
                const id = lessonPlanStep._id;
                delete lessonPlanStep._id;
                const result = await this.update(id, lessonPlanStep);
                results.push(result);

            }

        }

        return results;
    }
}

export {LessonPlanStepBusinessManager};
