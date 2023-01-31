import {inject, injectable} from "inversify";
import ICourseDataManager from "./../ICourseDataManager";
import TYPES from "../../../types";
import ICourseBase from "../../shared/ICourseBase";

@injectable()
class CourseDataManager implements ICourseDataManager {
    private _dao: ICourseBase;

    constructor(
        @inject(TYPES.CourseDataObject) dao:ICourseBase
    ){
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

    getBySharedKey(sharedKey: string): Promise<any> {
        return this._dao.getBySharedKey(sharedKey);
    }

    getMany(userId: string): Promise<any> {
        return this._dao.getMany(userId);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

}

export {CourseDataManager};
