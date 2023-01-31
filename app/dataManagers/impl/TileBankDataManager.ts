import {inject, injectable} from "inversify";
import ITileBankDataManager from "../ITileBankDataManager";
import TYPES from "../../../types";
import ITileBankBase from "../../shared/ITileBankBase";

@injectable()
class TileBankDataManager implements ITileBankDataManager {
    private _dao:ITileBankBase;

    constructor(
        @inject(TYPES.TileBankDataObject) dao:ITileBankBase
    ){
        this._dao = dao;
    }

    get(id: string): Promise<any> {
        return this._dao.get(id);
    }

    getByUserId(id: string): Promise<any> {
        return this._dao.getByUserId(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

    create(data: any): Promise<any> {
        return this._dao.create(data);
    }

}

export {TileBankDataManager};
