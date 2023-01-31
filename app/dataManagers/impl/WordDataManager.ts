import IWordDataManager from "../IWordDataManager";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import IWordBase from "../../shared/IWordBase";

@injectable()
class WordDataManager implements IWordDataManager {
    _dao:IWordBase;

    constructor(
        @inject(TYPES.WordDataObject) dao:IWordBase
    ){
        this._dao = dao;
    }
    get(filter: any): Promise<any> {
        return this._dao.get(filter);
    }

    getWordsByIds(ids: number[]): Promise<any> {
        return this._dao.getWordsByIds(ids);
    }

}

export {WordDataManager};
