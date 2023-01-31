import ICourseWorkbookDataManager from "../ICourseWorkbookDataManager";
import {inject, injectable} from "inversify";
import ICourseWorkbookMongoDao from "../../dataObjects/ICourseWorkbookMongoDao";
import TYPES from "../../../types";
import ICourseWorkbookBase from "../../shared/ICourseWorkbookBase";
const ObjectId = require('bson-objectid');

@injectable()
class CourseWorkbookDataManager implements ICourseWorkbookDataManager {
    private _dao:ICourseWorkbookBase;

    constructor(
        @inject(TYPES.CourseWorkbookDataObject) dao:ICourseWorkbookBase
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
        return this._dao.get(id);
    }

    getMany(id: string): Promise<any> {
        console.log('2')
        return this._dao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }
    updateByWorkbook(id: string, workbookId: string, data: any): Promise<any> {
        return this._dao.updateByWorkbook(id, workbookId, data);
    }

    deleteByWorkbookId(workbookId: string): Promise<any> {
        return this._dao.deleteByWorkbookId(workbookId);
    }

    getByCourseId(courseId: any): Promise<any> {
        return this._dao.getByCourseId(courseId);
    }

    getNonMerged(id: string): Promise<any> {
        return this._dao.getNonMerged(id);
    }

    deleteFromCourseWorkbookByWorkbookId(workbookId: string, courseId: any): Promise<any> {
        return this._dao.deleteFromCourseWorkbookByWorkbookId(workbookId, courseId);
    }

    getCountByWorkbookId(workbookId: string): Promise<any> {
        return this._dao.getCountByWorkbookId(workbookId);
    }

}

export {CourseWorkbookDataManager};
