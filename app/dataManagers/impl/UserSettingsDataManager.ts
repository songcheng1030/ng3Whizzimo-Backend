import {inject, injectable} from "inversify";
import IUserSettingsBase from "../../shared/IUserSettingsBase";
import {UserSettings} from "../../models/UserSettings";
import TYPES from "../../../types";

@injectable()
class UserSettingsDataManager implements IUserSettingsBase{
    _dao: IUserSettingsBase;

    constructor(
        @inject(TYPES.UserSettingsDataObject) dao: IUserSettingsBase
    ) {
        this._dao = dao;
    }
    create(newUserSettings: UserSettings): Promise<any> {
        return this._dao.create(newUserSettings);
    }

    get(userSettingsId: string): Promise<any> {
        return this._dao.get(userSettingsId);
    }

    getMany(userId: string): Promise<any> {
        return this._dao.getMany(userId);
    }

    remove(userSettingsId: string): Promise<any> {
        return this._dao.remove(userSettingsId);
    }

    update(userSettingsId: string, updatedUserSettings: UserSettings): Promise<any> {
        return this._dao.update(userSettingsId, updatedUserSettings);
    }

    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any> {
        return this._dao.updateCompoundSound(userSettingsId, compoundSound);
    }

}

export {UserSettingsDataManager}
