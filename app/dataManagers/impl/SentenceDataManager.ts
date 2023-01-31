import {inject, injectable} from "inversify";
import ISentenceDataManager from "../ISentenceDataManager";
import TYPES from "../../../types";
import ISentenceBase from "../../shared/ISentenceBase";

@injectable()
class SentenceDataManager implements ISentenceDataManager {
    private _dao:ISentenceBase;

    constructor(
        @inject(TYPES.SentenceDataObject) dao:ISentenceBase
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

export {SentenceDataManager};
