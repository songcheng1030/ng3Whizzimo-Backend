import {inject, injectable} from "inversify";
import IWorkbookPassageDataManager from "../IWorkbookPassageDataManager";
import TYPES from "../../../types";
import IWorkbookPassageMongoDao from "../../dataObjects/IWorkbookPassageMongoDao";

@injectable()
class WorkbookPassageDataManager implements IWorkbookPassageDataManager{
    private _dao:IWorkbookPassageMongoDao;

    constructor(
        @inject(TYPES.WorkbookPassageDataObject) dao:IWorkbookPassageMongoDao
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

    deleteMany(passageId: string): Promise<any> {
        return this._dao.deleteMany(passageId);
    }

}

export {WorkbookPassageDataManager};
