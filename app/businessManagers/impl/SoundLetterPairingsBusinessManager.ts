import ISoundLetterPairingsBusinessManager from "../ISoundLetterPairingsBusinessManager";
import { inject, injectable } from "inversify";
import ISoundLetterPairingsDataManager from "../../dataManagers/ISoundLetterPairingsDataManager";
import TYPES from "../../../types";

@injectable()
class SoundLetterPairingsBusinessManager implements ISoundLetterPairingsBusinessManager {
    _soundLetterPairingsDataManager: ISoundLetterPairingsDataManager;

    constructor(
        @inject(TYPES.SoundLetterPairingsDataManager) soundLetterPairingsDataManager:ISoundLetterPairingsDataManager
    ) {
        this._soundLetterPairingsDataManager = soundLetterPairingsDataManager;
    }

    getSoundLetterPairings(): Promise<any> {
        return this._soundLetterPairingsDataManager.getSoundLetterPairings();
    }

}

export {SoundLetterPairingsBusinessManager};