import { UserActivitySettings } from '../../models/UserActivitySettings';
const {userActivitySettings} = require('../../db');
import { injectable } from 'inversify';
import IUserActivitySettingsBase from '../../shared/IUserActivitySettingsBase';
const ObjectId = require('bson-objectid');

@injectable()
class UserActivitySettingsMongoDao implements IUserActivitySettingsBase {
    updateMany(id: string, data: any){
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            userActivitySettings.update({ownerKey: id}, {$set: data})
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    create(newItem: UserActivitySettings): Promise<any> {
        return new Promise((resolve, reject) => {
            userActivitySettings
                .insert(newItem)
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    get(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            userActivitySettings
                .find({_id: id})
                .then((result: any) => {
                    if(result.length === 0) {
                        return resolve(null);
                    }

                    resolve(result[0]);
                })
                .catch((error: any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;

        return new Promise((resolve, reject) => {
            userActivitySettings
                .find({ownerKey: id})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    remove(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            userActivitySettings
                .remove({_id: id})
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update(userActivitySettingsId: string, updatedItem: UserActivitySettings): Promise<any> {
        userActivitySettingsId = ObjectId.isValid(userActivitySettingsId) ? ObjectId(userActivitySettingsId) : userActivitySettingsId;

        return new Promise((resolve, reject) => {
            userActivitySettings
                .update({_id: userActivitySettingsId}, {$set: updatedItem})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

}

export {UserActivitySettingsMongoDao}
