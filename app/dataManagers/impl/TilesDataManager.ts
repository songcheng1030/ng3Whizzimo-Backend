import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import ITilesDataManager from "../ITilesDataManager";
import ITilesBase from "../../shared/ITilesBase";

@injectable()
class TilesDataManager implements ITilesDataManager {
    private _dao:ITilesBase;

    constructor(
        @inject(TYPES.TilesDataObject) dao:ITilesBase
    ){
        this._dao = dao;
    }

    query(query: string): Promise<any> {
        return this._dao.query(query);
    }

    get(): Promise<any> {
        return this._dao.get();
    }

}

export {TilesDataManager};
