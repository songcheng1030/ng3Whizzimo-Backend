import {inject, injectable} from "inversify";
import ISocialMediaBusinessManager from "../ISocialMediaBusinessManager";
import ISocialMediaDataManager from "../../dataManagers/ISocialMediaDataManager";
import TYPES from "../../../types";

@injectable()
class SocialMediaBusinessManager implements ISocialMediaBusinessManager {
    private _socialMediaDataManager:ISocialMediaDataManager;

    constructor(
        @inject(TYPES.SocialMediaDataManager) socialMediaDataManager:ISocialMediaDataManager
    ) {
        this._socialMediaDataManager = socialMediaDataManager;
    }

    sendMessage(message: string): Promise<any> {
        return this._socialMediaDataManager.sendMessage(message);
    }
}

export {SocialMediaBusinessManager};
