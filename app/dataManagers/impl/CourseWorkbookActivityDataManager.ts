import {inject, injectable} from "inversify";
import ICourseWorkbookActivityBase from "../../shared/ICourseWorkbookActivityBase";
import ICourseWorkbookActivityDataManager from "../ICourseWorkbookActivityDataManager";
import TYPES from "../../../types";
import ICourseWorkbookActivityMongoDao from "../../dataObjects/ICourseWorkbookActivityMongoDao";

@injectable()
class CourseWorkbookActivityDataManager implements ICourseWorkbookActivityDataManager {
    private _dao: ICourseWorkbookActivityMongoDao;

    constructor(
        @inject(TYPES.CourseWorkbookActivityDataObject) dao: ICourseWorkbookActivityMongoDao
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

    getByCourseWorkbookAndActivityType(courseWorkbookId: string, activityTypeId: string): Promise<any> {
        return this._dao.getByCourseWorkbookAndActivityType(courseWorkbookId, activityTypeId);
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id,data);
    }

    updateByWorkbookId(workbookId: string, updatedCourseWorkbookActivity: any): Promise<any> {
        return this._dao.updateByWorkbookId(workbookId, updatedCourseWorkbookActivity);
    }

    getByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        return this._dao.getByCourseWorkbookId(courseWorkbookId);
    }

}

export {CourseWorkbookActivityDataManager};
