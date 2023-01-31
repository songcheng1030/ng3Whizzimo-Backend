import {injectable} from "inversify";
import IWorkbookFileMongoDao from "../IWorkbookFileMongoDao";
import {workbookFile, workbook, files, courseWorkbook} from "../../db";
const ObjectId = require('bson-objectid');

@injectable()
class WorkbookFileMongoDao implements IWorkbookFileMongoDao {

   async create(data: any): Promise<any> {
        data.workbookId = ObjectId.isValid(data.workbookId) ? ObjectId(data.workbookId) : data.workbookId;
        data.fileId = ObjectId.isValid(data.fileId) ? ObjectId(data.fileId) : data.fileId;
        console.log('1')
        try {
            let workbookFiles = await workbookFile.find({_id: data.workbookId})
            let file = await files.find({_id: data.fileId})
            console.log('file', file)
            if(workbookFiles.length > 0){
                console.log('2')
                console.log('fired')
                return new Promise((resolve, reject) => {
                    console.log('inside promise')
                    workbookFile.findAndModify(
                        {
                            query: {_id: data.workbookId}, 
                            update: {
                                $push: {
                                    files: file[0]
                                },
                                $inc: {
                                    numFile: 1
                                }
                        //     $push: {
                        //     file: file[0]
                        // }
                        }
                        }
                        )
                        .then((file: any) => {
                            resolve(file)
                        })
                        .then((response: any) => { 
                            this.get(data.workbookId)
                            .then((workbookFile) => {
                                console.log('data', data)
                                courseWorkbook.update(
                                    {ownerKey: data.ownerKey, workbookId: data.workbookId}, 
                                    {$set: {"files": workbookFile}},
                                    {multi: true}
                                )
                                .then((result: any) => {
                                    console.log('update result', result)
                                });
                            })
                        })
    
                        .catch((error:any) => reject(error));
    
    
                    // .then((file: any) => {
                    //     resolve(file)
                    // })
        
                })
            } else {
                console.log('3')

                // return new Promise(null);
                file.fileId = data.fileId;
                let newWorkbookFile = {
                    _id: data.workbookId,
                    numFile: 1,
                    files: file,
                    ownerKey: data.ownerKey
                };

                return new Promise((resolve, reject) => {
                    workbookFile
                        .insert(newWorkbookFile)
                        .then((newWorkbookFile:any) => {
                            this.get(data.workbookId)
                            .then((workbookFile) => {
                                console.log('workbook file', workbookFile)
                                courseWorkbook.update(
                                    {ownerKey: data.ownerKey, workbookId: data.workbookId}, 
                                    {$set: {"files": [workbookFile]}},
                                    {multi: true}
                                );
                            })

                         resolve(newWorkbookFile)
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
       return workbookFile.remove({_id: id});
    }
    async modify(collectionId: string, itemId: string): Promise<any> {
        let id = ObjectId.isValid(collectionId) ? ObjectId(collectionId) : collectionId;
        itemId = ObjectId.isValid(itemId) ? ObjectId(itemId) : itemId;
        let found = await workbookFile.find({_id: id, "files.fileId": itemId})
        console.log('found', found)
        console.log('collection id', collectionId)
        console.log('item id', itemId)
        if(found.length > 0){
            console.log('found!')
            return workbookFile.update({
                _id: id,
            "files.fileId": itemId},
            { $pull: { 'files': { fileId: itemId } }, 
            $inc: { numFile: -1 } })
    
        } else {
            console.log('not found...')
            return workbookFile.update({
                _id: id,
            "files._id": itemId},
            { $pull: { 'files': { _id: itemId } }, 
            $inc: { numFile: -1 } })
    
        }
    }

    async clone(data: any): Promise<any> {
        data._id = ObjectId.isValid(data._id) ? ObjectId(data._id) : data._id;
        console.log('file data: ', data)
        let workbookFiles = await workbookFile.find({_id: data._id})
        console.log('data response', data)
        console.log('workbook passages', workbookFiles)
        try {
            if(workbookFiles.length === 0){
                // return new Promise(null);
                console.log('new workbook file object created', data)
                return new Promise((resolve,  reject) => {
                    workbookFile
                        .insert(data)
                        .then((newWorkbookFile:any) => {
                            this.get(data._id)
                            .then((workbookFile) => {
                                console.log('workbook file', workbookFile)
                                courseWorkbook.update(
                                    {ownerKey: data.ownerKey, workbookId: data._id}, 
                                    {$set: {"files": [workbookFile]}},
                                    {multi: true}
                                );
                            })
                            resolve(newWorkbookFile)
                        })
                        .catch((error:any) => reject(error));
                });
        
            }    
        } catch(e){
            console.log('Uh Oh, there was an error', e)
        }
    }


    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: { "_id": ObjectId.isValid(id) ? ObjectId(id) : id }},
                // { $lookup: {from: "files", localField: "fileId", foreignField: "_id", as: "file" } },
                // { $unwind: "$file"},
                // {
                //     $project: {
                //         workbookId: 1,
                //         fileId: 1,
                //         file: {
                //             file: 1
                //         },
                //         // name: 1
                //     }
                // }
            ];

            return workbookFile
                .aggregate(pipeline)
                .then((workbookFiles: any[]) => {
                    // workbookFiles = workbookFiles.map(workbookFile => {
                    //     if(workbookFile.file.length > 0) {
                    //         delete workbookFile.file[0]._id;
                    //         workbookFile.file = workbookFile.file[0]
                    //         return {...workbookFile, ...workbookFile.file};
                    //     }

                    //     workbook.file = null;
                    //     return workbookFile;
                    // });
                    resolve(workbookFiles[0]);
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    getMany(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: { "_id": ObjectId.isValid(id) ? ObjectId(id) : id  }},
                // { $lookup: {from: "files", localField: "fileId", foreignField: "_id", as: "file" } },
            ];

            return workbookFile
                .aggregate(pipeline)
                .then((workbookFiles: any[]) => {
                    // workbookFiles = workbookFiles.map(workbookFile => {
                    //     if(workbookFile.file.length > 0) {
                    //         delete workbookFile.file[0]._id;
                    //         workbookFile.file = workbookFile.file[0]
                    //         return {...workbookFile, ...workbookFile.file[0]};
                    //     }
                    //     workbookFile.file = null;
                    //     return workbookFile;
                    // });
                    resolve(workbookFiles);
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    async update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        let found = await workbookFile.find({_id: id})

        data.map((file: any) => {
            file._id = ObjectId.isValid(file._id) ? ObjectId(file._id) : file._id;
            if(file.fileId){
                file.fileId = ObjectId.isValid(file.fileId) ? ObjectId(file.fileId) : file.fileId;           
            }
            return file;
        })

        found[0].files = data
        console.log('found', found)
        console.log('data', data)

        return workbookFile.update({_id: id}, {$set: found[0]})
        .then((response: any) => {
            console.log('response', response)
            courseWorkbook.update(
                {ownerKey: found.ownerKey, workbookId: id}, 
                {$set: {"files": [found[0]]}},
                {multi: true}
            );

        });
    }

    deleteMany(fileId: string): Promise<any> {
        fileId = ObjectId.isValid(fileId) ? ObjectId(fileId) : fileId;
        return workbookFile.remove({fileId: fileId});
    }


}

export {WorkbookFileMongoDao};
