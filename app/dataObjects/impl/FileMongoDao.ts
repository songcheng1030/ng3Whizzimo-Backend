import {injectable, multiInject} from "inversify";
import {files, workbookFile} from "../../db";
import IFileBase from "../../shared/IFileBase";
const ObjectId = require('bson-objectid');

@injectable()
class FileMongoDao implements IFileBase {


    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            files.insert(data)
                .then((result:any) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            files
                .remove({_id: id})
                .then(() => {
                    return workbookFile.remove({workbookId: id});
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
            files.find({_id: id})
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
        return files.find({ownerKey: id});
    }

    update(id: string, data: any): Promise<any> {
        const _id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return files.update({_id}, {$set: data});
    }

}

export {FileMongoDao};
