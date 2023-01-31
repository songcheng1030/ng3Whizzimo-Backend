import IUserBase from "../../shared/IUserBase";
import IUserMongoDao from "../IUserMongoDao";
import {injectable} from "inversify";
import {Errors} from "../../constants/Errors";
const {user} = require('../../db');
const ObjectId = require('bson-objectid');

@injectable()
class UserMongoDao implements IUserBase {
    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            user
                .insert(data)
                .then((result:any) => {
                    if(result.statusCode) {
                        reject(Errors.duplicate('User'));
                    }

                    resolve(null);
                })
                .catch((error:any) => reject(error))
        });
    }

    delete(userId: string): Promise<any> {
        userId = ObjectId.isValid(userId) ? ObjectId(userId) : userId;
        return new Promise((resolve, reject) => {
            user
                .remove({_id: userId})
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    get(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            user
                .find({_id: userId})
                .then((result:any) => {
                    if(result.length === 0) {
                        return resolve(null);
                    }

                    resolve(result[0]);
                })
                .catch((error: any) => reject(error));
        });
    }

    update(userId: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            user
                .update({_id: userId}, {$set: data})
                .then((result:any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    getByEmail(email:string){
        return new Promise((resolve, reject) => {
            user
                .find({email: email}, {cusID: 1, email: 1})
                .then((result: any) => {
                    if(result.length === 0) {
                        return resolve(null);
                    }

                    resolve(result[0]);
                })
                .catch((error: any) => reject(error));
        });
    }

    getByIdOrEmail(userInfo: string): Promise<any> {
        return new Promise((resolve, reject) => {
            user
                .find({$in: [{_id: userInfo},{email: userInfo}]})
                .then((result: any) => {
                    if(result.length === 0) {
                        return resolve(null);
                    }

                    resolve(result[0]);
                })
                .catch((error: any) => reject(error));
        });
    }
}

export {UserMongoDao};
