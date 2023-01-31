import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import ITilesBusinessManager from "../ITilesBusinessManager";
import ITilesDataManager from "../../dataManagers/ITilesDataManager";
import IPairingsBusinessManager from "../IPairingsBusinessManager";
import IPairingsDataManager from "../../dataManagers/IPairingsDataManager";

@injectable()
class PairingsBusinessManager implements IPairingsBusinessManager {
    private _pairingsDataManager:IPairingsDataManager;

    constructor(
        @inject(TYPES.PairingsDataManager) pairingsDataManager:IPairingsDataManager
    ) {
        this._pairingsDataManager = pairingsDataManager;
    }

    getAllPairings(): Promise<any> {
        return this._pairingsDataManager.getAllPairings();
    }

    getPairingsFromCompoundSounds(compoundSounds: any[]): Promise<any> {
        return this._pairingsDataManager.getPairingsFromCompoundSounds(compoundSounds);
    }


}

export {PairingsBusinessManager};
