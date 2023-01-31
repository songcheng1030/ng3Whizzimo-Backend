import {inject, injectable} from "inversify";
import IFileDataManager from "../../../app/dataManagers/IFileDataManager";
import IFileBase from "../../../app/shared/IFileBase";
import TYPES from "../../../types";

@injectable()
class FileTestDataManager implements IFileDataManager {
    private _dao:IFileBase;

    constructor(
        @inject(TYPES.FileDataObject) dao:IFileBase
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

    getMany(id: string): Promise<any> {
        return this._dao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

    simpleCreate(data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}

export {FileTestDataManager};
