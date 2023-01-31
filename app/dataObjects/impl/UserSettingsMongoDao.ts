import IUserSettingsBase from "../../shared/IUserSettingsBase";
import {UserSettings} from "../../models/UserSettings";
const {userSettings} = require('../../db');
import {injectable} from "inversify";
import {DefaultUserSettings} from "../../constants/DefaultUserSettings";
const ObjectId = require('bson-objectid');


@injectable()
class UserSettingsMongoDao implements  IUserSettingsBase {
    create(newItem: UserSettings): Promise<any> {
        return new Promise((resolve, reject) => {
            userSettings
                .insert(newItem)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            userSettings
                .findOne({_id: id})
                .then((result: any) => {
                   if(result) {
                       result.tiles.blank = DefaultUserSettings.tiles.blank;
                       resolve(result)
                    }

                   reject("No User Settings Found.");
                })
                .catch((error: any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;

        return new Promise((resolve, reject) => {
            userSettings
                .find({ownerKey: id})
                .then((results: any) => {
                    results = results.map((result:any) => {
                        result.tiles.blank = DefaultUserSettings.tiles.blank;
                        return result;
                    });
                    resolve(results)
                })
                .catch((error: any) => reject(error));
        });
    }

    remove(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            userSettings
                .remove({_id: id})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    update(userSettingsId: string, updatedItem: UserSettings): Promise<any> {
        userSettingsId = ObjectId.isValid(userSettingsId) ? ObjectId(userSettingsId) : userSettingsId;

        return new Promise((resolve, reject) => {
            userSettings
                .update({_id: userSettingsId}, {$set: updatedItem})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any> {
        userSettingsId = ObjectId.isValid(userSettingsId) ? ObjectId(userSettingsId) : userSettingsId;

        return new Promise((resolve, reject) => {
            userSettings.update(
                {_id: userSettingsId},
                {$set: {[`compoundSounds.${compoundSound.name}`]: compoundSound.value}}
            );
        })
    }
}

export {UserSettingsMongoDao}
