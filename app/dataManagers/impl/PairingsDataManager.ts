import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import ITilesBase from "../../shared/ITilesBase";
import IPairingsDataManager from "../IPairingsDataManager";
import IPairingsBase from "../../shared/IPairingsBase";

@injectable()
class PairingsDataManager implements IPairingsDataManager {
    private _dao:IPairingsBase;

    constructor(
        @inject(TYPES.PairingsDataObject) dao:IPairingsBase
    ){
        this._dao = dao;
    }

    getAllPairings(): Promise<any> {
        return this._dao.getAllPairings();
    }

    getPairingsFromCompoundSounds(compoundSounds: any[]): Promise<any> {
        return this._dao.getPairingsFromCompoundSounds(compoundSounds);
    }

}

export {PairingsDataManager};
