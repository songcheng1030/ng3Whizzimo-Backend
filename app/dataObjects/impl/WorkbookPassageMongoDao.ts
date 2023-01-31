import {injectable} from "inversify";
import IWorkbookPassageMongoDao from "../IWorkbookPassageMongoDao";
import {workbookPassage, passages, courseWorkbook} from "../../db";
import { textChangeRangeIsUnchanged } from "typescript";
const ObjectId = require('bson-objectid');

@injectable()
class WorkbookPassageMongoDao implements IWorkbookPassageMongoDao {
    async create(data: any): Promise<any> {
        data.workbookId = ObjectId.isValid(data.workbookId) ? ObjectId(data.workbookId) : data.workbookId;
        data.passageId = ObjectId.isValid(data.passageId) ? ObjectId(data.passageId) : data.passageId;
        try {
            let workbookPassages = await workbookPassage.find({_id: data.workbookId})
            let passage = await passages.find({_id: data.passageId})
            console.log('fired', data)
            if(workbookPassages.length > 0){
                return new Promise((resolve, reject) => {
                    console.log('inside promise')
                    let order = workbookPassages[0].numPassage;
                    passage[0].order = order;
                    workbookPassage.findAndModify({
                            query: {_id: data.workbookId}, 
                            update: {
                                $push: {
                                    passages: passage[0]
                                },
                                $inc: {
                                    numPassage: 1
                                }
                            }
                    })
                    .then((response: any) => {
                        console.log('resonse retrieved', response)
                        this.get( data.workbookId)
                        .then((workbookPassage) => {
                            console.log('workbook passage!', workbookPassage)
                            courseWorkbook.update(
                                {ownerKey: data.ownerKey, workbookId: data.workbookId}, 
                                {$set: {"passages": [workbookPassage]}},
                                {multi: true}
                            );
    
                            resolve(workbookPassage)
                        })
                    })
                    .then((passage: any) => {
                        console.log('passaged returned', passage)

                        // resolve(passage)
                    })

                    .catch((error:any) => reject(error));

        
                })
            } else {
                // return new Promise(null);
                passage[0].passageId = data.passageId;
                passage[0].order = 0;
                let newWorkbookPassage = {
                    _id: data.workbookId,
                    numPassage: 1,
                    passages: passage,
                    ownerKey: data.ownerKey

                }
                console.log('new workbook passage', newWorkbookPassage)
                return new Promise((resolve, reject) => {
                    workbookPassage
                        .insert(newWorkbookPassage)
                        .then((newWorkbookPassage:any) => 
                        this.get(newWorkbookPassage._id))
                        .then((newWorkbookPassage:any) => {
                            console.log('new workbook passage 2', newWorkbookPassage)
                            courseWorkbook.update(
                                {ownerKey: data.ownerKey, workbookId: data.workbookId}, 
                                {$set: {"passages": [newWorkbookPassage]}},
                                {multi: true}
                            );
                            resolve(newWorkbookPassage)
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
        return workbookPassage.remove({_id: id});
    }

    async clone(data: any): Promise<any> {
        data._id = ObjectId.isValid(data._id) ? ObjectId(data._id) : data._id;
        console.log('sentence data: ', data)
        let workbookpassages = await workbookPassage.find({_id: data._id})
        console.log('data response', data)
        console.log('workbook passages', workbookpassages)
        try {
            if(workbookpassages.length === 0){
                // return new Promise(null);
                console.log('new workbook passage object created', data)
                return new Promise((resolve,  reject) => {
                    workbookPassage
                        .insert(data)
                        .then((newWorkbookPassage:any) => this.get(newWorkbookPassage._id))
                        .then((newWorkbookPassage: any) => {
                            console.log('data', data)
                             courseWorkbook.update(
                                {ownerKey: data.ownerKey, workbookId: data._id}, 
                                {$set: {"passages": [newWorkbookPassage]}},
                                {multi: true}
                            );
                            resolve(newWorkbookPassage)
                        })
                        .catch((error:any) => reject(error));
                });
        
            }    
        } catch(e){
            console.log('Uh Oh, there was an error', e)
        }
    }


    async modify(collectionId: string, itemId: string): Promise<any> {
        let id = ObjectId.isValid(collectionId) ? ObjectId(collectionId) : collectionId;
        itemId = ObjectId.isValid(itemId) ? ObjectId(itemId) : itemId;
        let found = await workbookPassage.find({_id: id, "passages.passageId": itemId})
        console.log('found', found)
        console.log('collection id', collectionId)
        console.log('item id', itemId)
        if(found.length > 0){
            console.log('found!')
            return workbookPassage.update({
                _id: id,
            "passages.passageId": itemId},
            { $pull: { 'passages': { passageId: itemId } }, 
            $inc: { numPassage: -1 } })
    
        } else {
            console.log('not found...')
            return workbookPassage.update({
                _id: id,
            "passages._id": itemId},
            { $pull: { 'passages': { _id: itemId } }, 
            $inc: { numPassage: -1 } })
    
        }
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: { "_id": ObjectId.isValid(id) ? ObjectId(id) : id }},

                // { $lookup: {from: "passages", localField: "passageId", foreignField: "_id", as: "passage" } },
                // { $unwind: "$passage"},
                // {
                //     $project: {
                //         workbookId: 1,
                //         passageId: 1,
                //         passage: {
                //             passage: 1
                //         }
                //     }
                // }
            ];

            return workbookPassage
                .aggregate(pipeline)
                .then((workbookPassages: any[]) => {
                    console.log('workbook passage retrieved!', workbookPassages)
                    // workbookPassages = workbookPassages.map(workbookPassage => {
                    //     delete workbookPassage.passage._id;
                    //     return {...workbookPassage, ...workbookPassage.passage};
                    // });
                    resolve(workbookPassages[0]);
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    getMany(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                // { $lookup: {from: "passages", localField: "passageId", foreignField: "_id", as: "passage" } },
                // { $unwind: "$passage"},
                { $match: { "_id": ObjectId.isValid(id) ? ObjectId(id) : id }},
                // {
                //     $project: {
                //         workbookId: 1,
                //         passageId: 1,
                //         passage: {
                //             passage: 1
                //         },
                //         order: 1
                //     }
                // }
            ];

            return workbookPassage
                .aggregate(pipeline)
                .then((workbookPassages: any[]) => {
                    // workbookPassages = workbookPassages.map(workbookPassage => {
                    //     delete workbookPassage.passage._id;
                    //     return {...workbookPassage, ...workbookPassage.passage};
                    // });
                    resolve(workbookPassages);
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    async update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        let found = await workbookPassage.find({_id: id})
        // data.passages.map((passage: any) => {
        //     passage._id = ObjectId.isValid(passage._id) ? ObjectId(passage._id) : passage._id;
        //     return passage;
        // })
        data.map((passage: any) => {
            passage._id = ObjectId.isValid(passage._id) ? ObjectId(passage._id) : passage._id;
            if(passage.passageId ){
                passage.passageId = ObjectId.isValid(passage.passageId) ? ObjectId(passage.passageId) : passage.passageId;           
            }
            return passage;
        })

        found[0].passages = data

        console.log('data recieved', data)
        return workbookPassage.update({_id: id}, {$set: found[0]})
        .then((response: any) => {
            courseWorkbook.update(
                {ownerKey: data.ownerKey, workbookId: data._id}, 
                {$set: {"passages": [found[0]]}},
                {multi: true}
            );

        });
    }



    deleteMany(passageId: string): Promise<any> {
        passageId = ObjectId.isValid(passageId) ? ObjectId(passageId) : passageId;
        return workbookPassage.remove({passageId: passageId});
    }
}

export {WorkbookPassageMongoDao};
