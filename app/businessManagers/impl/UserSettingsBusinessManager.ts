import {inject, injectable} from "inversify";
import IUserSettingsBusinessManager from "../IUserSettingsBusinessManager";
import TYPES from "../../../types";
import {UserSettings} from "../../models/UserSettings";
import IUserSettingsDataManager from "../../dataManagers/IUserSettingsDataManager";
import {DefaultUserSettings} from "../../constants/DefaultUserSettings";
import {Errors} from "../../constants/Errors";

@injectable()
class UserSettingsBusinessManager implements IUserSettingsBusinessManager {
    private _userSettingsDataManager: IUserSettingsDataManager;

    constructor(
        @inject(TYPES.UserSettingsDataManager) userSettingsDataManager: IUserSettingsDataManager
    ) {
        this._userSettingsDataManager = userSettingsDataManager;
    }

    create(userId: string): Promise<any> {
        return this._userSettingsDataManager.create({...DefaultUserSettings, ...{ownerKey: userId}});
    }

    get(userSettingsId: string): Promise<any> {
        return this._userSettingsDataManager.get(userSettingsId);
    }

    getMany(userId: string): Promise<any> {
        return this._userSettingsDataManager.getMany(userId);
    }

    remove(userSettingsId: string): Promise<any> {
        return this._userSettingsDataManager.remove(userSettingsId);
    }

    update(userSettingsId: string, updatedUserSettings: UserSettings): Promise<any> {
        delete updatedUserSettings.ownerKey;
        delete updatedUserSettings._id;

        return this._userSettingsDataManager.update(userSettingsId, updatedUserSettings);
    }

    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any> {
        return this._userSettingsDataManager.updateCompoundSound(userSettingsId, compoundSound);
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data.owner = locals.userId;

            this.create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    protectedDelete(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => this.remove(id))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    protectedUpdate(id: string, data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => this.update(id, data))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    validateOwner(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) =>  {
            if(locals.admin) {
                return resolve(null);
            }

            this._userSettingsDataManager.get(id)
                .then((result: any) => {
                    if(!result || result.ownerKey !== locals.userId) {
                        return reject(Errors.notAuthorized);
                    }

                    resolve('OK');
                })
        });
    }

    copy(userSettingsId: string, ownerKey: string, changeName: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            let updateId: string;
            this._userSettingsDataManager
                .getMany(ownerKey)
                .then(result => {
                    updateId = result[0]._id
                    return this._userSettingsDataManager.get(userSettingsId);
                })
                .then(result => {
                    result.ownerKey = ownerKey;

                   if(changeName) {
                       result.name += ' (copy)';
                   }

                   //todo: set up multiple user settings
                   //return this._userSettingsDataManager.create(result);
                    delete result._id;
                   return this._userSettingsDataManager.update(updateId, result);
               })
               .then(result => {
                   resolve(result);
               })
               .catch(error => {
                   reject(error);
               })
        });
    }

}

export {UserSettingsBusinessManager};
