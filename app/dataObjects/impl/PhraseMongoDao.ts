import {injectable} from "inversify";
import IPhraseMongoDao from "../IPhraseMongoDao";
import {phrases, workbookPhrase} from "../../db";
import IPhraseBase from "../../shared/IPhraseBase";
const ObjectId = require('bson-objectid');

@injectable()
class PhraseMongoDao implements IPhraseBase {
    create(data: any): Promise<any> {
        return phrases.insert(data);
    }

    delete(id: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            phrases
                .remove({_id: id})
                .then(() => {
                    return workbookPhrase.remove({workbookId: id});
                })
                .then(() => {
                    resolve('OK');
                })
                .catch((error:any) => {
                    reject(error)
                });
        })
    }

    get(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            phrases
                .find({_id: id})
                .then((result: any[]) => {
                    if (result.length === 0) {
                        return resolve(null);
                    }

                    resolve(result[0]);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    getMany(id: string): Promise<any> {
        return phrases.find({ownerKey: id});
    }

    update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return phrases.update({_id: id}, {$set: data});
    }

}

export {PhraseMongoDao};
