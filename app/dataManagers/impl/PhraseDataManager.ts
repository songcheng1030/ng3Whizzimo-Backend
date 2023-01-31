import {inject, injectable} from "inversify";
import IPhraseDataManager from "../IPhraseDataManager";
import TYPES from "../../../types";
import IPhraseMongoDao from "../../dataObjects/IPhraseMongoDao";
import IPhraseBase from "../../shared/IPhraseBase";
import IWorkbookPhraseDataManager from "../IWorkbookPhraseDataManager";

@injectable()
class PhraseDataManager implements IPhraseDataManager{
    private _dao:IPhraseBase;

    constructor(
        @inject(TYPES.PhraseDataObject) dao:IPhraseBase,

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

}

export {PhraseDataManager};
