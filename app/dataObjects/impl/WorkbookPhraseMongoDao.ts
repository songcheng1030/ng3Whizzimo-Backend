import {injectable} from "inversify";
import IWorkbookPhraseMongoDao from "../IWorkbookPhraseMongoDao";
import {phrases, workbookPhrase, phrase, courseWorkbook} from "../../db";
const ObjectId = require('bson-objectid');

@injectable()
class WorkbookPhraseMongoDao implements IWorkbookPhraseMongoDao {
    async create(data: any): Promise<any> {
        data.workbookId = ObjectId.isValid(data.workbookId) ? ObjectId(data.workbookId) : data.workbookId;
        data.phraseId = ObjectId.isValid(data.phraseId) ? ObjectId(data.phraseId) : data.phraseId;

        // return new Promise((resolve, reject) => {
        //     workbookPhrase
        //         .insert(data)
        //         .then((newWorkbookPhrase:any) => this.get(newWorkbookPhrase._id))
        //         .then((newWorkbookPhrase:any) => resolve(newWorkbookPhrase))
        //         .catch((error:any) => reject(error));
        // });
        try {
            let workbookPhrases = await workbookPhrase.find({_id: data.workbookId})
            let phrase = await phrases.find({_id: data.phraseId})
            console.log('fired', workbookPhrases)
            console.log('passage', phrase)

            if(workbookPhrases.length > 0){
                console.log('fired')
                return new Promise((resolve, reject) => {
                    console.log('inside promise')
                    let order = workbookPhrases[0].numPhrase;
                    phrase[0].order = order;
                    workbookPhrase.findAndModify(
                        {
                            query: {_id: data.workbookId}, 
                            update: {
                                $push: {
                                    phrases: phrase[0]
                                },
                                $inc: {
                                    numPhrase: 1
                                }
                        }
                        }
                        )
                        .then((response: any) =>{ 
                            this.get( data.workbookId)
                            .then((workbookPhrase) => {
                                courseWorkbook.update(
                                    {ownerKey: data.ownerKey, workbookId: data.workbookId}, 
                                    {$set: {"phrases": workbookPhrase}},
                                    {multi: true}
                                );
                                resolve(workbookPhrase)
                            })
                        })

                        .then((phrase: any) => {
                            // resolve(phrase)
                        })
                        .catch((error:any) => reject(error));
            
                })
            } else {
                // return new Promise(null);
                phrase[0].phraseId = data.phraseId;
                phrase[0].order = 0;

                let newWorkbookPhrase = {
                    _id: data.workbookId,
                    numPhrase: 1,
                    phrases: phrase,
                    ownerKey: data.ownerKey

                };

                return new Promise((resolve,  reject) => {
                    workbookPhrase
                        .insert(newWorkbookPhrase)
                        .then((newworkbookPhrase:any) => this.get(newworkbookPhrase._id))
                        .then((newworkbookPhrase:any) => {
                            courseWorkbook.update(
                                {ownerKey: data.ownerKey, workbookId: data.workbookId}, 
                                {$set: {"phrases": newworkbookPhrase}},
                                {multi: true}
                            );

                            resolve(newworkbookPhrase)
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
        let workbookPhrases = await workbookPhrase.find({_id: data._id})
        console.log('data response', data)
        console.log('workbook phrases', workbookPhrases)
        try {
            if(workbookPhrases.length === 0){
                // return new Promise(null);
                console.log('new workbook sentence object created', data)
                return new Promise((resolve,  reject) => {
                    workbookPhrase
                        .insert(data)
                        .then((newworkbookPhrase:any) => this.get(newworkbookPhrase._id))
                        .then((newworkbookPhrase: any) => {
                            console.log('data', data)
                             courseWorkbook.update(
                                {ownerKey: data.ownerKey, workbookId: data._id}, 
                                {$set: {"phrases": [newworkbookPhrase]}},
                                {multi: true}
                            );
                            resolve(newworkbookPhrase)
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
        return workbookPhrase.remove({_id: id});
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: { "_id": ObjectId.isValid(id) ? ObjectId(id) : id }},
                // { $lookup: {from: "phrases", localField: "phraseId", foreignField: "_id", as: "phrase" } },
                // { $unwind: "$phrase"},
                // {
                //     $project: {
                //         workbookId: 1,
                //         phraseId: 1,
                //         phrase: {
                //             phrase: 1
                //         }
                //     }
                // }
            ];

            return workbookPhrase
                .aggregate(pipeline)
                .then((workbookPhrases: any[]) => {
                    // workbookPhrases = workbookPhrases.map(workbookPhrase => {
                    //     delete workbookPhrase.phrase._id;
                    //     return {...workbookPhrase, ...workbookPhrase.phrase};
                    // });
                    resolve(workbookPhrases);
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    getMany(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                // { $lookup: {from: "phrases", localField: "phraseId", foreignField: "_id", as: "phrase" } },
                { $match: { "_id": ObjectId.isValid(id) ? ObjectId(id) : id }},
                // {
                //     $project: {
                //         workbookId: 1,
                //         phraseId: 1,
                //         phrase: {
                //             phrase: 1
                //         },
                //         order: 1
                //     }
                // }
            ];

            return workbookPhrase
                .aggregate(pipeline)
                .then((workbookPhrases: any[]) => {
                    // workbookPhrases = workbookPhrases.map(workbookPhrase => {
                    //     if(workbookPhrase.phrase.length > 0){
                    //         delete workbookPhrase.phrase[0]._id;
                    //         workbookPhrase.phrase = workbookPhrase.phrase[0];
                    //         return {...workbookPhrase, ...workbookPhrase.phrase};
                    //     }
                    // });
                    resolve(workbookPhrases);
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    // async update(id: string, data: any): Promise<any> {
    //     id = ObjectId.isValid(id) ? ObjectId(id) : id;
    //     let _id = ObjectId.isValid(data._id) ? ObjectId(data._id) : data._id;
    //     let phraseId = ObjectId.isValid(data.phraseId) ? ObjectId(data.phraseId) : data.phraseId;
    //     let workbookId = ObjectId.isValid(data.workbookId) ? ObjectId(data.workbookId) : data.workbookId
    //     console.log('found!', found)
    //     if(found){
    //         console.log('data', data)
    //         return workbookPhrase.update(
    //         {
    //             _id: workbookId,
                    
    //             "phrases._id": _id
                          
    //         },
    //         {$set: {"phrases.$": newData} }
    //         )
    //         .then((response: any) => {
    //             console.log('response', response)
    //             // courseWorkbook.update(
    //             //     {
    //             //     ownerKey: data.ownerKey,
    //             //     workbookId: data._id
    //             // }, 
    //             //     {$set: {"phrases": [data]}},
    //             //     {multi: true}
    //             // );
    
    //         });
    
    //     } else {
    //         console.log('data', data)
    //         return workbookPhrase.update(
    //         {
    //             _id: workbookId,
    //             "phrases.phraseId": phraseId
                    
    //         },
    //         {$set: {"phrases.$": newData} }
    //         )
    //         .then((response: any) => {
    //             console.log('response', response)
    //             // courseWorkbook.update(
    //             //     {
    //             //     ownerKey: data.ownerKey,
    //             //     workbookId: data._id
    //             // }, 
    //             //     {$set: {"phrases": [data]}},
    //             //     {multi: true}
    //             // );
    
    //         });
    
    //     }
    // }

    async update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        let found = await workbookPhrase.find({_id: id})
        data.map((phrase: any) => {
            phrase._id = ObjectId.isValid(phrase._id) ? ObjectId(phrase._id) : phrase._id;
            if(phrase.phraseId){
                phrase.phraseId = ObjectId.isValid(phrase.phraseId) ? ObjectId(phrase.phraseId) : phrase.phraseId;           
            }
            return phrase;
        })
        found[0].phrases = data
        console.log('found', found)
        console.log('data', data)

        return workbookPhrase.update({_id: id}, {$set: found[0]})
        .then((response: any) => {
            console.log('response', response)
            courseWorkbook.update(
                {ownerKey: found.ownerKey, workbookId: id}, 
                {$set: {"phrases": [found[0]]}},
                {multi: true}
            );

        });
    }
    async modify(collectionId: string, itemId: string): Promise<any> {
        let id = ObjectId.isValid(collectionId) ? ObjectId(collectionId) : collectionId;
        itemId = ObjectId.isValid(itemId) ? ObjectId(itemId) : itemId;
        let found = await workbookPhrase.find({_id: id, "phrases.phraseId": itemId})
        console.log('found', found)
        console.log('collection id', collectionId)
        console.log('item id', itemId)
        if(found.length > 0){
            console.log('found!')
            return workbookPhrase.update({
                _id: id,
            "phrases.phraseId": itemId},
            { $pull: { 'phrases': { phraseId: itemId } }, 
            $inc: { numPhrase: -1 } })
    
        } else {
            console.log('not found...')
            return workbookPhrase.update({
                _id: id,
            "phrases._id": itemId},
            { $pull: { 'phrases': { _id: itemId } }, 
            $inc: { numPhrase: -1 } })
    
        }
    //     console.log('not found...')
    //     let found = await workbookPhrase.find({_id: id, "phrases._id": itemId})
    //     courseWorkbook.update(
    //         {
    //             ownerKey: found[0].ownerKey, 
    //             workbookId: id
    //         }, 
    //         {
    //             $pull: {"phrases[0].phrases": {phraseId: itemId}},
    //             $inc: { numPhrase: -1 }
    //         },
    //         {multi: true}
    //     )
    //     .then(() => {
    //         return workbookPhrase.update({
    //             _id: id,
    //         "phrases._id": itemId},
    //         { $pull: { 'phrases': { _id: itemId } }, 
    //         $inc: { numPhrase: -1 } })
    //     })
    // }

    }

    deleteMany(phraseId: string): Promise<any> {
        phraseId = ObjectId.isValid(phraseId) ? ObjectId(phraseId) : phraseId;
        return workbookPhrase.remove({phraseId: phraseId});
    }

}

export {WorkbookPhraseMongoDao};
