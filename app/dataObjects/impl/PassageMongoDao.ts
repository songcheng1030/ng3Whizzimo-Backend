import {injectable} from "inversify";
import IPassageMongoDao from "../IPassageMongoDao";
import {passages, workbookPassage} from "../../db";
import IPassageBase from "../../shared/IPassageBase";
const ObjectId = require('bson-objectid');

@injectable()
class PassageMongoDao implements IPassageBase {
    create(data: any): Promise<any> {
        return passages.insert(data);
    }

    delete(id: string): Promise<any> {
        ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            passages
                .remove({_id: id})
                .then(() => {
                    return workbookPassage.remove({workbookId: id});
                })
                .then(() => {
                    resolve('OK');
                })
                .catch((error:any) => reject(error));
        })
    }

    get(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;

        return new Promise((resolve, reject) => {
            passages.find({_id: id})
                .then((result: any[]) => {
                    if(result.length === 0) {
                        return resolve(null)
                    }
                    resolve(result[0]);
                })
                .catch((error: any) => {
                    reject(error);
                });

        });
    }

    getMany(id: string): Promise<any> {
        return passages.find({ownerKey: id});
    }

    update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            passages.update({_id: id}, {$set: data})
                .then((result: any) => {
                    console.log('passage edited', data)
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });

        });
    }

}

export {PassageMongoDao};
