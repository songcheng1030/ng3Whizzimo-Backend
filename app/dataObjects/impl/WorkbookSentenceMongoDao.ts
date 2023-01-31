import IWorkbookSentenceMongoDao from "../IWorkbookSentenceMongoDao";
import {injectable} from "inversify";
import {workbookSentence, sentences, workbook, courseWorkbook} from "../../db";
const ObjectId = require('bson-objectid');

@injectable()
class WorkbookSentenceMongoDao implements IWorkbookSentenceMongoDao {
    async create(data: any): Promise<any> {
        data.workbookId = ObjectId.isValid(data.workbookId) ? ObjectId(data.workbookId) : data.workbookId;
        data.sentenceId = ObjectId.isValid(data.sentenceId) ? ObjectId(data.sentenceId) : data.sentenceId;
        console.log('sentence data: ', data)
        let workbookSentences = await workbookSentence.find({_id: data.workbookId})
        let sentence = await sentences.find({_id: data.sentenceId})
        console.log('data response', data)
        console.log('workbook sentences', workbookSentences)
        try {
            if(workbookSentences.length > 0){
                console.log('fired')
                return new Promise((resolve, reject) => {
                    console.log('inside promise')
                    let order = workbookSentences[0].numSentence;
                    sentence[0].order = order;

                    workbookSentence.findAndModify(
                        {
                            query: {_id: data.workbookId}, 
                            update: {
                                $push: {
                                    sentences: sentence[0]
                                },
                                $inc: {
                                    numSentence: 1
                                },
                                $set: {ownerKey: data.ownerKey }
                            }
                        })
                        .then((response: any) => {
                            this.get( data.workbookId)
                            .then((workbookSentence) => {
                                workbookSentences.ownerKey =  data.ownerKey;
                                courseWorkbook.update(
                                    {ownerKey: data.ownerKey, workbookId: data.workbookId}, 
                                    {$set: {"sentences": [workbookSentence]}},
                                    {multi: true}
                                );
                                resolve(workbookSentence)

                            })
                        })
                        .catch((error:any) => reject(error));
                    })
            } else {
                sentence[0].sentenceId = data.sentenceId;
                sentence[0].order = 0;
                let newWorkbookSentence = {
                    _id: data.workbookId,
                    numSentence: 1,
                    sentences: sentence,
                    ownerKey: data.ownerKey
                };

                // return new Promise(null);
                console.log('new workbook sentence object created', newWorkbookSentence)
                return new Promise((resolve,  reject) => {
                    workbookSentence
                        .insert(newWorkbookSentence)
                        .then((newWorkbookSentence:any) => this.get(newWorkbookSentence._id))
                        .then((newWorkbookSentence: any) => {
                            console.log('data', data)
                             courseWorkbook.update(
                                {ownerKey: data.ownerKey, workbookId: data.workbookId}, 
                                {$set: {"sentences": [newWorkbookSentence]}},
                                {multi: true}
                            );
                            resolve(newWorkbookSentence)
                        })
                        .catch((error:any) => reject(error));
                });
        
            }    
        } catch(e){
            console.log('Uh Oh, there was an error', e)
        }
    }

   async clone(data: any): Promise<any> {
        data._id = ObjectId.isValid(data._id) ? ObjectId(data._id) : data._id;
        console.log('sentence data: ', data)
        let workbookSentences = await workbookSentence.find({_id: data._id})
        let sentence = await sentences.find({_id: data.sentenceId})
        console.log('data response', data)
        console.log('workbook sentences', workbookSentences)
        try {
            if(workbookSentences.length === 0){
                // return new Promise(null);
                console.log('new workbook sentence object created', data)
                return new Promise((resolve,  reject) => {
                    workbookSentence
                        .insert(data)
                        .then((newWorkbookSentence:any) => this.get(newWorkbookSentence._id))
                        .then((newWorkbookSentence: any) => {
                            console.log('data', data)
                             courseWorkbook.update(
                                {ownerKey: data.ownerKey, workbookId: data._id}, 
                                {$set: {"sentences": [newWorkbookSentence]}},
                                {multi: true}
                            );
                            resolve(newWorkbookSentence)
                        })
                        .catch((error:any) => reject(error));
                });
        
            }    
        } catch(e){
            console.log('Uh Oh, there was an error', e)
        }
    }

    delete(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            workbookSentence.remove({_id: id})
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                })
        });
    }
    
    async modify(collectionId: string, itemId: string): Promise<any> {
        let id = ObjectId.isValid(collectionId) ? ObjectId(collectionId) : collectionId;
        itemId = ObjectId.isValid(itemId) ? ObjectId(itemId) : itemId;
        let found = await workbookSentence.find({_id: id, "sentences.sentenceId": itemId})
        if(found.length > 0){
            console.log('found!')
            return workbookSentence.update({
                _id: id,
            "sentences.sentenceId": itemId},
            { $pull: { 'sentences': { sentenceId: itemId } }, 
            $inc: { numSentence: -1 } })
    
        } else {
            console.log('not found...')
            return workbookSentence.update({
                _id: id,
            "sentences._id": itemId},
            { $pull: { 'sentences': { _id: itemId } }, 
            $inc: { numSentence: -1 } })
    
        }
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                // { $lookup: {from: "sentences", localField: "sentenceId", foreignField: "_id", as: "sentence" } },
                { $match: { "_id": ObjectId.isValid(id) ? ObjectId(id) : id }},
                // { $unwind: "$sentence"},
                // {
                //     $project: {
                //         workbookId: 1,
                //         sentenceId: 1,
                //         sentence: {
                //             sentence: 1
                //         }
                //     }
                // }
            ];

            return workbookSentence
                .aggregate(pipeline)
                .then((workbookSentences: any[]) => {
                    // workbookSentences = workbookSentences.map(workbookSentence => {
                    //     delete workbookSentence.sentence._id;
                    //     return {...workbookSentence, ...workbookSentence.sentence};
                    // });
                    resolve(workbookSentences[0]);
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    getMany(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                // { $lookup: {from: "sentences", localField: "sentenceId", foreignField: "_id", as: "sentence" } },
                { $match: { "_id": ObjectId.isValid(id) ? ObjectId(id) : id }},
                // { $unwind: "$sentence"},
                // {
                //     $project: {
                //         workbookId: 1,
                //         sentenceId: 1,
                //         sentence: {
                //             sentence: 1
                //         },
                //         order: 1
                //     }
                // }
            ];

            return workbookSentence
                .aggregate(pipeline)
                .then((workbookSentence: any) => {
                    // workbookSentences = workbookSentences.map(workbookSentence => {
                    //     delete workbookSentence.sentence._id;
                    //     return {...workbookSentence, ...workbookSentence.sentence};
                    // });
                    resolve(workbookSentence);
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

   async update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        let found = await workbookSentence.find({_id: id})

        data.map((sentence: any) => {
            sentence._id = ObjectId.isValid(sentence._id) ? ObjectId(sentence._id) : sentence._id;
            if(sentence.sentenceId){
                sentence.sentenceId = ObjectId.isValid(sentence.sentenceId) ? ObjectId(sentence.sentenceId) : sentence.sentenceId;           
            }
            return sentence;
        })

        found[0].sentences = data
        return workbookSentence.update({_id: id}, {$set: found[0]})
        .then((response: any) => {
            courseWorkbook.update(
                {ownerKey: data.ownerKey, workbookId: id}, 
                {$set: {"sentences": [found[0]]}},
                {multi: true}
            );

        });
    }

    deleteMany(sentenceId: string): Promise<any> {
        sentenceId = ObjectId.isValid(sentenceId) ? ObjectId(sentenceId) : sentenceId;
        return workbookSentence.remove({sentenceId: sentenceId});
    }

}

export {WorkbookSentenceMongoDao};
