import {inject, injectable} from "inversify";
import IStudentBusinessManager from "../IStudentBusinessManager";
import IStudentDataManager from "../../dataManagers/IStudentDataManager";
import TYPES from "../../../types";
import Student from "../../models/Student";

@injectable()
class StudentBusinessManager implements IStudentBusinessManager {
    private _studentDataManager: IStudentDataManager;

    constructor(
        @inject(TYPES.StudentDataManager) studentDataManager:IStudentDataManager
    ) {
        this._studentDataManager = studentDataManager;
    }

    create(data: Student): Promise<any> {
        return this._studentDataManager.create(data);
    }

    delete(id: string): Promise<any> {
        return this._studentDataManager.delete(id);
    }

    get(id: string): Promise<any> {
        return this._studentDataManager.get(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._studentDataManager.update(id, data);
    }

    getMany(id: string): Promise<any> {
        return this._studentDataManager.getMany(id);
    }
}

export {StudentBusinessManager}
