import ITileBankBase from "../../shared/ITileBankBase";
import {injectable} from "inversify";
import {tileBank} from "../../db";
import {Errors} from "../../constants/Errors";
const ObjectId = require('bson-objectid');

@injectable()
class TileBankMongoDao implements ITileBankBase {
    get(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            tileBank.find({_id: id})
                .then((result: any[]) => {
                    if(result.length === 0) {
                        resolve(null);
                    }

                    resolve(result[0]);
                })
                .catch((error:any) => reject(error));
        })
    }

    getByUserId(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return tileBank.find({ownerKey: id});
    }

    update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return tileBank.update({_id: id}, {$set: {bank: data}});
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            tileBank
                .insert(data)
                .then((result:any) => {
                    if(result.statusCode) {
                        reject(Errors.duplicate('User'));
                    }

                    resolve(result);
                })
                .catch((error:any) => reject(error))
        });
    }
}

export {TileBankMongoDao};
