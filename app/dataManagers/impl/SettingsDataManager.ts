import ISettingsDataManager from "../ISettingsDataManager";
import {inject, injectable} from "inversify";
import ISettingsMongoDao from "../../dataObjects/ISettingsMongoDao";
import ISettingsBase from "../../shared/ISettingsBase";
import TYPES from "../../../types";
import {Settings} from "../../models/Settings";

@injectable()
export default class SettingsDataManager implements ISettingsDataManager {
    _dao: ISettingsBase;

    constructor(
        @inject(TYPES.SettingsDataObject) dao: ISettingsBase
    ) {
        this._dao = dao;
    }

    create(newSettings: any): Promise<any> {
        return this._dao.create(newSettings);
    }

    get(settingsId: string): Promise<any> {
        return this._dao.get(settingsId);
    }

    getMany(userId: string): Promise<any> {
        return this._dao.getMany(userId);
    }

    remove(settingsId: string): Promise<any> {
        return this._dao.remove(settingsId);
    }

    update(settingsId: string, updatedSettings: any): Promise<any> {
        return this._dao.update(settingsId, updatedSettings);
    }

    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any> {
        return this._dao.updateCompoundSound(userSettingsId, compoundSound);
    }

    updateMany(userId: string, data: any): Promise<any> {
        return this._dao.updateMany(userId, data);
    }

    getByUserId(userId: string): Promise<any> {
        return this._dao.getByUserId(userId);
    }

    updateFirst(userId: string, data: any): Promise<any> {
        return this._dao.updateFirst(userId, data);
    }

}
