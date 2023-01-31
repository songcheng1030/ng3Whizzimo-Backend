import IWorkbookMongoDao from "../IWorkbookMongoDao";
import {workbook, phrases} from "../../db";
import {injectable} from "inversify";
import IWorkbookBase from "../../shared/IWorkbookBase";
const ObjectId = require('bson-objectid');

@injectable()
class WorkbookMongoDao implements IWorkbookBase {
    create(data: any): Promise<any> {
        return workbook.insert(data);
    }

    delete(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return  workbook.remove({_id: id});
    }

    get(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;

        const pipeline = [
            { $match: { "_id": id }},
            { $lookup: {from: "workbookPhrase", localField: "_id", foreignField: "workbookId", as: "phrases" } },
            { $lookup: {from: "workbookFile", localField: "_id", foreignField: "workbookId", as: "files" } },
            { $lookup: {from: "workbookSentence", localField: "_id", foreignField: "workbookId", as: "sentences" } },
            { $lookup: {from: "workbookPassage", localField: "_id", foreignField: "workbookId", as: "passages" } },
        ]

        return new Promise((resolve, reject) => {
            workbook
                .aggregate(pipeline)
                .then((result: any) => {
                    if(result.length === 0) {
                        return resolve(null);
                    }

                    result = result[0];
                    result.hasFiles = (result.files && result.files.length > 0);
                    delete result.files;
                    result.hasPassages = (result.passages && result.passages.length > 0);
                    delete result.passages;
                    result.hasSentences = (result.sentences && result.sentences.length > 0);
                    delete result.sentences;
                    result.hasPhrases = (result.phrases && result.phrases.length > 0);
                    delete result.phrases;

                    resolve(result);
                })
                .catch((error: any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;

        return new Promise((resolve, reject) => {
            workbook
                .find({owner: id})
                .then((result:any) => {
                    //todo: set Phonetic, Nonsence, Real, and Sight based on filters

                    result = result.map((workbook: any) => {
                        if (!workbook.filters) return workbook;
                        workbook.real = !workbook.nonsense;
                        workbook.phonetic = workbook.filters.isPhonetic ? 'phonetic' : 'sight';

                        return workbook;
                    });

                    resolve(result)
                })
                .catch((error:any) => {
                    reject(error);
                });
        });
    }

    update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return workbook.update({_id: id}, {$set: data});
    }

    getManyById(ids: string[]): Promise<any> {
        const match = {
            _id: {
                $in: ids.map((id: any) => ({ _id: ObjectId.isValid(id) ? ObjectId(id) : id}))
            }
        };
        console.log('matches', match)
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: match},
                { $lookup: {from: "newWorkbookPhrase", localField: "_id", foreignField: "_id", as: "workbookPhrases" } },
                { $lookup: {from: "newWorkbookFile", localField: "_id", foreignField: "_id", as: "workbookFiles" } },
                { $lookup: {from: "newWorkbookSentence", localField: "_id", foreignField: "_id", as: "workbookSentences" } },


                { $lookup: {from: "newWorkbookPassage", localField: "_id", foreignField: "_id", as: "workbookPassages" } },
                
            ];

            return workbook
                .aggregate(pipeline)
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

}

export {WorkbookMongoDao};
