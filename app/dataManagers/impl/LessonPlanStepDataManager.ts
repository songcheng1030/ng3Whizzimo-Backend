import {inject, injectable} from "inversify";
import ILessonPlanStepDataManager from "../ILessonPlanStepDataManager";
import ILessonPlanStepMongoDao from "../../dataObjects/ILessonPlanStepMongoDao";
import TYPES from "../../../types";

@injectable()
class LessonPlanStepDataManager implements ILessonPlanStepDataManager {
    private _dao:ILessonPlanStepMongoDao;

    constructor(
        @inject(TYPES.LessonPlanStepDataObject) dao:ILessonPlanStepMongoDao
    ) {
      this._dao = dao;
    }

    create(data: any): Promise<any> {
        return this._dao.create(data);
    }

    delete(id: string): Promise<any> {
        return this._dao.delete(id);
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._dao
                .get(id)
                .then(result => {
                    resolve(result);
                }).catch(error => {
                    reject(error)
                });
        });
    }

    getMany(id: string): Promise<any> {
        return this._dao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

    deleteByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        return this._dao.deleteByCourseWorkbookId(courseWorkbookId);
    }

    deleteByWorkbookId(workbookId: string): Promise<any> {
        return this._dao.deleteByWorkbookId(workbookId);
    }

    deleteByCourseId(courseId: string): Promise<any> {
        return this._dao.deleteByCourseId(courseId);
    }

    deleteByLessonPlanId(lessonPlanId: string): Promise<any> {
        return this._dao.deleteByLessonPlanId(lessonPlanId);
    }

    getManyIds(id: string): Promise<any> {
        return this._dao.getManyIds(id);
    }

    getCountByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        return this._dao.getCountByCourseWorkbookId(courseWorkbookId);
    }

    getCountByWorkbookId(workbookId: string): Promise<any> {
        return this._dao.getCountByWorkbookId(workbookId);
    }

    updateFilesByWorkbookId(workbookId: string, data: any): Promise<any> {
        return this._dao.updateFilesByWorkbookId(workbookId, data);
    }

}

export {LessonPlanStepDataManager};
