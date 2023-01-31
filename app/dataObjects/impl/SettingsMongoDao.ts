import ISettingsMongoDao from "../ISettingsMongoDao";
import {Settings} from "../../models/Settings";
import {DefaultSettings} from "../../constants/DefaultSettings";
import {DefaultUserSettings} from "../../constants/DefaultUserSettings";
import {injectable} from "inversify";
const {settings} = require('../../db');
const ObjectId = require('bson-objectid');

@injectable()
export class SettingsMongoDao implements ISettingsMongoDao {
    create(newSettings: any): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('SETTINGS', newSettings)
            settings
                .insert(newSettings)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            settings
                .find({_id: id})
                .then((result: any) => {
                    if(result.length === 0) {
                        return resolve(DefaultSettings)
                    }

                    result = result[0];

                    if(result) {
                        result.tiles.blank = result.tiles.blank || DefaultSettings.tiles.blank;
                        resolve(result)
                    }

                    reject("No User Settings Found.");
                })
                .catch((error: any) => reject(error));
        });
    }

    getByUserId(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // create composite index of Ownerkey && isCurrent; {OwnerKey: 1, isCurrent: 1}
            settings
                .find({ownerKey: userId, isCurrent: true})
                .then((result: any) => {
                    if(result.length === 0) {
                       return resolve(DefaultSettings)
                    }

                    result = result[0];

                    if(result) {
                        result.tiles.blank = result.tiles.blank || DefaultSettings.tiles.blank;
                        resolve(result)
                    }

                    result.tiles.blank = DefaultSettings.tiles.blank;
                    resolve(result);
                    // console.log('settings results', result)
                })
                .catch((error: any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;

        return new Promise((resolve, reject) => {
            // create index for ownerKey; {ownerKey: 1}
            settings
                .find({ownerKey: id})
                .then((results: any) => {
                    console.log('settings recieved', results)
                    if(results.length > 0){
                        resolve(results)
                    } else {
                        resolve([DefaultSettings])
                    }
                })
                .catch((error: any) => reject(error));
        });
    }

    remove(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            settings
                .remove({_id: id})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    update(settingsId: string, updatedSettings: any): Promise<any> {
        settingsId = ObjectId.isValid(settingsId) ? ObjectId(settingsId) : settingsId;

        return new Promise((resolve, reject) => {
            settings
                .update({_id: settingsId}, {$set: updatedSettings})
                .then((result: any) => resolve(result))
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    updateCompoundSound(settingsId: string, compoundSound: any): Promise<any> {
        settingsId = ObjectId.isValid(settingsId) ? ObjectId(settingsId) : settingsId;

        return settings.update(
                {_id: settingsId},
                {$set: {[`compoundSounds.${compoundSound.name}`]: compoundSound.value}}
            );
    }

    updateMany(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            settings.update({ownerKey: id}, {$set: data}, {multi: true})
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    updateFirst(userId: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
           settings.update({ownerKey: userId}, {$set: data}, {multi: false})
               .then((result: any) => {
                   resolve(result);
               })
               .catch((error: any) => {
                   reject(error);
               });
        });
    }
}
