import ISoundLetterPairingsDataManager from "../ISoundLetterPairingsDataManager";
import {inject, injectable} from "inversify";
import ISoundLetterPairingsJsDao from "../../dataObjects/ISoundLetterPairingsJsDao";
import TYPES from "../../../types";

@injectable()
class SoundLetterPairingsDataManager implements ISoundLetterPairingsDataManager {
    private _dao: ISoundLetterPairingsJsDao;

    constructor(
        @inject(TYPES.SoundLetterPairingsDataObject) dao: ISoundLetterPairingsJsDao
    ) {
        this._dao = dao;
    }

    getSoundLetterPairings(): Promise<any> {
        return this._dao.getSoundLetterPairings();
    }

}

export {SoundLetterPairingsDataManager};