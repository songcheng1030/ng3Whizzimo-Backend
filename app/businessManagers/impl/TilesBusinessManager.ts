import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import ITilesBusinessManager from "../ITilesBusinessManager";
import ITilesDataManager from "../../dataManagers/ITilesDataManager";

@injectable()
class TilesBusinessManager implements ITilesBusinessManager {
    private _tilesDataManager:ITilesDataManager;

    constructor(
        @inject(TYPES.TilesDataManager) tilesDataManager:ITilesDataManager
    ) {
        this._tilesDataManager = tilesDataManager;
    }

    query(query: string): Promise<any> {
        return this._tilesDataManager.query(query);
    }

    get(): Promise<any> {
        return this._tilesDataManager.get();
    }
}

export {TilesBusinessManager};
