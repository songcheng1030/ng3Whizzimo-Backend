import ISettingsBusinessManager from "../ISettingsBusinessManager";
import ISettingsDataManager from "../../dataManagers/ISettingsDataManager";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import {DefaultActivitySettings} from "../../constants/DefaultUserActivitySettings";
import {DefaultSettings} from "../../constants/DefaultSettings";
import ITileBankBusinessManager from "../ITileBankBusinessManager";
import {DefaultTileBank} from "../../constants/DefaultTileBank";

@injectable()
export default class SettingsBusinessManager implements ISettingsBusinessManager {
    private _settingsDataManager: ISettingsDataManager;
    private _tileBankBusinessManager: ITileBankBusinessManager;

    constructor(
        @inject(TYPES.SettingsDataManager) settingsDataManager: ISettingsDataManager,
        @inject(TYPES.TileBankBusinessManager) tileBankBusinessManager: ITileBankBusinessManager
    ) {
        this._settingsDataManager = settingsDataManager;
        this._tileBankBusinessManager = tileBankBusinessManager;
    }
    create(userId: string, name: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let settings: any;
            this._settingsDataManager
                .create({...DefaultSettings, ...{ownerKey: userId},  ...name})
                .then((result: any) => {
                    settings = result;
                    const tileBank = {bank: DefaultTileBank, ownerKey: userId};
                    return this._tileBankBusinessManager.create(tileBank)
                })
                .then((result: any) => {
                    settings.tileBankId = result._id;
                    this.update(settings._id, {tileBankId: result._id});
                })
                .then(() => {
                    resolve(settings);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getByUserId(userId: string): Promise<any> {
        return this._settingsDataManager.getByUserId(userId);
    }

    getMany(userId: string): Promise<any> {
        return this._settingsDataManager.getMany(userId);
    }

    remove(settingsId: string): Promise<any> {
        let userId: string;
        return new Promise((resolve, reject) => {
            this._settingsDataManager
                .get(settingsId)
                .then((result: any) => {
                    userId = result.ownerKey;
                    return this._settingsDataManager.remove(settingsId)
                })
                .then(() => {
                    return this._settingsDataManager.updateFirst(userId, {isCurrent: true});
                })
                .then(() => {
                    resolve(null);
                })
                .catch(error => {
                    reject(error)
                });
        });
    }

    update(settingsId: string, updatedSettings: any): Promise<any> {
        delete updatedSettings.ownerKey;
        delete updatedSettings._id;

        return this._settingsDataManager.update(settingsId, updatedSettings);
    }

    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any> {
        return this._settingsDataManager.updateCompoundSound(userSettingsId, compoundSound);
    }

    updateCurrent(settingsId: string, userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.updateMany(userId, {isCurrent: false})
                .then(() => {
                    return this.update(settingsId, {isCurrent: true})
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
        return this._settingsDataManager.updateMany(userId, data);
    }

    copy(settingsId:string, ownerKey:string, changeName: boolean = true):Promise<any> {
        return new Promise((resolve, reject) => {
           this._settingsDataManager.get(settingsId)
               .then((settings: any) => {
                   if(!settings) {
                       return reject('The requested settings do not exist.');
                   }

                   delete settings._id;
                   settings.ownerKey = ownerKey;

                   if(changeName) {
                       settings.name += " (copy)";
                   }

                   return this._settingsDataManager.create(settings);
               })
               .then((result: any) => {
                   resolve(result);
               })
               .catch(error => {
                   reject(error)
               });
        });
    }
}
