import { inject, injectable } from "inversify";
import IUserActivitySettingsBusinessManager from "../IUserActivitySettingsBusinessManager";
import TYPES from "../../../types";
import {UserActivitySettings } from "../../models/UserActivitySettings";
import IUserActivitySettingsDataManager from '../../dataManagers/IUserActivitySettingsDataManager';
import {DefaultActivitySettings} from '../../constants/DefaultUserActivitySettings';
import {Errors} from "../../constants/Errors";

@injectable()
class UserActivitySettingsBusinessManager implements IUserActivitySettingsBusinessManager {
    private _userActivitySettingsDataManager: IUserActivitySettingsDataManager;

    constructor(
        @inject(TYPES.UserActivitySettingsDataManager) userActivitySettingsDataManager: IUserActivitySettingsDataManager
    ) {
        this._userActivitySettingsDataManager = userActivitySettingsDataManager;
    }

    updateCurrent(userActivitySettingsId: string, userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.updateMany(userId, {isCurrent: false})
            .then(() => {
                return this.update(userActivitySettingsId, {isCurrent: true})
            })
            .then(() => {
                resolve('OK')
            })
            .catch(error => {
                reject(error)
            });
        });
    }
    updateMany(userId: string, data: any): Promise<any> {
        return this._userActivitySettingsDataManager.updateMany(userId, data);
    }

    create(userId: string, name: any): Promise<any> {
        return this._userActivitySettingsDataManager.create({...DefaultActivitySettings, ...{ownerKey: userId},  ...name})
    }

    copy(userActivitySettingsId: string, ownerKey: string): Promise <any> {
        return new Promise((resolve, reject) => {
            let newActivitySetting: any;
            this._userActivitySettingsDataManager
            .get(userActivitySettingsId)
            .then((result: any) => {
                if(!result) reject(Errors.notFound('Activity Setting'));
                result.oldId = result._id;
                delete result._id;
                result.ownerKey = ownerKey;
                result.name = `${result.name} Copy`;

                return this._userActivitySettingsDataManager.create(result);
            })
            .then((newActivitySetting: any) => {
                resolve(newActivitySetting)
            })
            .catch((error: any) => {
                reject(error)
            })
        })
    }

    get(userActivitySettingsId: string): Promise<any> {
        return this._userActivitySettingsDataManager.get(userActivitySettingsId);
    }

    getMany(userId: string): Promise<any> {
        return this._userActivitySettingsDataManager.getMany(userId);
    }

    remove(userActivitySettingsId: string): Promise<any> {
        return this._userActivitySettingsDataManager.remove(userActivitySettingsId);
    }

    update(userActivitySettingsId: string, updatedUserActivitySettings: any): Promise<any> {
        delete updatedUserActivitySettings.ownerKey;
        delete updatedUserActivitySettings._id;

        return this._userActivitySettingsDataManager.update(userActivitySettingsId, updatedUserActivitySettings);
    }
}

export {UserActivitySettingsBusinessManager};
