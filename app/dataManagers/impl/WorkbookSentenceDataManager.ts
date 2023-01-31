import {inject, injectable} from "inversify";
import IWorkbookSentenceDataManager from "../IWorkbookSentenceDataManager";
import IWorkbookSentenceMongoDao from "../../dataObjects/IWorkbookSentenceMongoDao";
import TYPES from "../../../types";

@injectable()
class WorkbookSentenceDataManager implements IWorkbookSentenceDataManager{
    private _dao:IWorkbookSentenceMongoDao;

    constructor(
        @inject(TYPES.WorkbookSentenceDataObject) dao:IWorkbookSentenceMongoDao
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

    deleteMany(sentenceId: string): Promise<any> {
        return this._dao.deleteMany(sentenceId);
    }

}

export {WorkbookSentenceDataManager};
