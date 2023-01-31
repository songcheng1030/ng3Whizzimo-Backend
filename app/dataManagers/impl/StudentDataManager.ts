import {inject, injectable} from "inversify";
import IStudentDataManager from "../IStudentDataManager";
import TYPES from "../../../types";
import Student from "../../models/Student";
import IStudentBase from "../../shared/IStudentBase";

@injectable()
class StudentDataManager implements IStudentDataManager {
    _dao: IStudentBase;

    constructor(
        @inject(TYPES.StudentDataObject) dao:IStudentBase
    ){
        this._dao = dao;
    }
    create(data: Student): Promise<any> {
        return this._dao.create(data);
    }

    delete(id: string): Promise<any> {
        return this._dao.delete(id);
    }

    get(id: string): Promise<any> {
        return this._dao.get(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

    getMany(id: string): Promise<any> {
        return this._dao.getMany(id);
    }

}

export {StudentDataManager};
