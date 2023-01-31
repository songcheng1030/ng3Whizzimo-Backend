import {inject, injectable} from "inversify";
import IWorkbookFileDataManager from "../IWorkbookFileDataManager";
import IWorkbookFileMongoDao from "../../dataObjects/IWorkbookFileMongoDao";
import TYPES from "../../../types";

@injectable()
class WorkbookFileDataManager implements  IWorkbookFileDataManager{
    private _dao:IWorkbookFileMongoDao;

    constructor(
        @inject(TYPES.WorkbookFileDataObject) dao:IWorkbookFileMongoDao
    ){
        this._dao = dao;
    }

    create(data: any): Promise<any> {
        return this._dao.create(data);
    }

    clone(data: any): Promise<any> {
        return this._dao.clone(data);
    }


    delete(id: string): Promise<any> {
        return this._dao.delete(id);
    }
    modify(workbookId: string, id: string): Promise<any> {
        return this._dao.modify(workbookId, id);
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

    deleteMany(fileId: string): Promise<any> {
        return this._dao.deleteMany(fileId);
    }

}

export {WorkbookFileDataManager};
