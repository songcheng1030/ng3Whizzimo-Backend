import IWorkbookBase from "../../shared/IWorkbookBase";
import {inject, injectable} from "inversify";
import IWorkbookMongoDao from "../../dataObjects/IWorkbookMongoDao";
import TYPES from "../../../types";
import IWorkbookDataManager from "../IWorkbookDataManager";

@injectable()
class WorkbookDataManager implements IWorkbookDataManager {
    private _dao:IWorkbookBase;

    constructor(
        @inject(TYPES.WorkbookDataObject) dao:IWorkbookBase
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

    getManyById(ids: string[]): Promise<any> {
        return this._dao.getManyById(ids);
    }

}

export {WorkbookDataManager};
