import {inject, injectable} from "inversify";
import IWorkbookPhraseDataManager from "../IWorkbookPhraseDataManager";
import IWorkbookPhraseMongoDao from "../../dataObjects/IWorkbookPhraseMongoDao";
import TYPES from "../../../types";

@injectable()
class WorkbookPhraseDataManager implements IWorkbookPhraseDataManager {
    private _dao:IWorkbookPhraseMongoDao;

    constructor(
        @inject(TYPES.WorkbookPhraseDataObject) dao:IWorkbookPhraseMongoDao
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
        console.log('data', data)
        return this._dao.update(id, data);
    }

    deleteMany(phraseId: string): Promise<any> {
        return this._dao.deleteMany(phraseId);
    }

}

export {WorkbookPhraseDataManager};
