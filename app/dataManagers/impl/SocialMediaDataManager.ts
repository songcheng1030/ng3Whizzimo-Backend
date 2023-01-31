import ISocialMediaDataManager from "../ISocialMediaDataManager";
import {inject, injectable} from "inversify";
import ISocialMediaBase from "../../shared/ISocialMediaBase";
import TYPES from "../../../types";

@injectable()
class SocialMediaDataManager implements ISocialMediaDataManager {
    _dao:ISocialMediaBase;

    constructor(
        @inject(TYPES.SocialMediaDataObject) dao:ISocialMediaBase
    ){
        this._dao = dao;
    }

    sendMessage(message: string): Promise<any> {
        return this._dao.sendMessage(message);
    }
}

export {SocialMediaDataManager};
