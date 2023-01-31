import {injectable} from "inversify";
import {sentences, workbookSentence} from "../../db";
import ISentenceBase from "../../shared/ISentenceBase";
const ObjectId = require('bson-objectid');

@injectable()
class SentenceMongoDao implements ISentenceBase {
    create(data: any): Promise<any> {
                console.log('sentence data: ', data)

        return sentences.insert(data);
    }

    delete(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            sentences
                .remove({_id: id})
                .then(() => {
                    return workbookSentence.remove({workbookId: id});
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
            sentences.find({_id: id})
                .then((result: any[]) => {
                    if(result.length === 0) {
                        return resolve(null);
                    }

                    resolve(result[0]);
                })
                .catch((error: any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        return sentences.find({ownerKey: id});
    }

    update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return sentences.update({_id: id}, {$set: data});
    }

}

export {SentenceMongoDao};
