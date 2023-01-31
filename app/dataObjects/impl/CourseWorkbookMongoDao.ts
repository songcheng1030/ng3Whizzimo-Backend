import ICourseWorkbookBase from "../../shared/ICourseWorkbookBase";
const {courseWorkbook, lessonPlanSteps} = require('../../db');
import {injectable} from "inversify";
import {workbookSentence, workbookPassage, workbookPhrase, workbookFile, workbook, words} from "../../db";
const ObjectId = require('bson-objectid');

@injectable()
class CourseWorkbookMongoDao implements ICourseWorkbookBase {
    async create(data: any): Promise<any> {
        data.workbookId = ObjectId.isValid(data.workbookId) ? ObjectId(data.workbookId) : data.workbookId;
        data.courseId = ObjectId.isValid(data.courseId) ? ObjectId(data.courseId) : data.courseId;
        
        let workbookObj = await workbook.find({_id: data.workbookId})
        let sentenceObj = await workbookSentence.find({_id: data.workbookId});
        let passageObj = await workbookPassage.find({_id: data.workbookId});
        let phraseObj = await workbookPhrase.find({_id: data.workbookId});
        let fileObj = await workbookFile.find({_id: data.workbookId});
        let wordids = workbookObj[0].preview.filter((word: any) => word)
        .map((word: any) => parseInt(word.wordid))
        console.log('word ids', wordids)
        let wordsObj = await words.find({wordid: {$in: wordids}})
        data.workbook = workbookObj;
        data.sentences = sentenceObj;
        data.passages = passageObj;
        data.phrases = phraseObj;
        data.files = fileObj;
        data.fullWords = wordsObj;
        console.log('course workbook', data)
        console.log('workbook', workbookObj)

        return new Promise((resolve, reject) => {
            courseWorkbook
                .insert(data)
                .then((obj:any) => {
                    resolve(obj);
                })
                .catch((error:any) => {
                    reject(error);
                });
        });
    }

    delete(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            courseWorkbook.remove({_id: id})
                .then((obj:any) => resolve(obj))
                .catch((error:any) => {
                    reject(error);
                });
        });
    }

    getNonMerged(id: string) {
        return new Promise((resolve, reject) => {
            id = ObjectId.isValid(id) ? ObjectId(id) : id;
            courseWorkbook.find({_id: id})
                .then((obj:any) => {
                    if (obj.length === 0) {

                    }
                    resolve(obj[0])
                })
                .catch((error:any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        console.log('COURSE WORKBOOK ID', id)
        return new Promise((resolve, reject) => {
            const pipleine = [
                { $match: { _id: ObjectId.isValid(id) ? ObjectId(id) : id }},
                // { $lookup: {from: "workbook", localField: "workbookId", foreignField: "_id", as: "workbook" } },
                { $unwind: "$workbook"},
                // { $lookup: {from: "workbookPhrase", localField: "workbookId", foreignField: "workbookId", as: "phrases" } },
                // // // { $lookup: {from: "phrases", localField: "phrases.phraseId", foreignField: "_id", as: "phrases" } },
                // { $lookup: {from: "workbookFile", localField: "workbookId", foreignField: "workbookId", as: "files" } },
                // // // { $lookup: {from: "files", localField: "files.fileId", foreignField: "_id", as: "files" } },
                // { $lookup: {from: "workbookSentence", localField: "workbookId", foreignField: "workbookId", as: "sentences" } },
                // // // { $lookup: {from: "sentences", localField: "sentences.sentenceId", foreignField: "_id", as: "sentences" } },
                // { $lookup: {from: "workbookPassage", localField: "workbookId", foreignField: "workbookId", as: "passages" } },
                // // { $lookup: {from: "passages", localField: "passages.passageId", foreignField: "_id", as: "passages" } },
                // { $lookup: {from: "WordData", localField: 'workbook.preview.wordid', foreignField: "wordid", as: "fullWords"} },
            ];

            courseWorkbook
                .aggregate(pipleine)
                .then((result:any) => {
                    if(result.length === 0)
                        resolve(null);
                    else
                        resolve(result[0]);
                })
                .catch((error:any) => {
                    reject(error);
                })
        });
    }

    async getMany(id: string): Promise<any> {
        console.log('3')

        console.log('COURSE WORKBOOK ID', id)
        // id = ObjectId.isValid(id) ? ObjectId(id) : id;
        // return await courseWorkbook.find({ "courseId": id });
        // console.log('course workbooks', courseWorkbooks)
        return new Promise((resolve, reject) => {

            const pipeline = [
                { $match: { "courseId": ObjectId.isValid(id) ? ObjectId(id) : id }},
                // { $lookup: {from: "workbook", localField: "workbookId", foreignField: "_id", as: "workbook" } },
                { $unwind: "$workbook"},

                // { $lookup: {from: "newWorkbookPhrases", localField: "workbookId", foreignField: "_id", as: "phrases" } },
                // // { $lookup: {from: "phrases", localField: "phrases.phraseId", foreignField: "_id", as: "phrases" } },
                // { $lookup: {from: "newWorkbookFile", localField: "workbookId", foreignField: "_id", as: "files" } },
                // // { $lookup: {from: "files", localField: "files.fileId", foreignField: "_id", as: "files" } },
                // { $lookup: {from: "newWorkbookSentence", localField: "workbookId", foreignField: "_id", as: "sentences" } },
                // // { $lookup: {from: "sentences", localField: "sentences.sentenceId", foreignField: "_id", as: "sentences" } },
                // { $lookup: {from: "newWorkbookPassage", localField: "workbookId", foreignField: "_id", as: "passages" } },
                // // { $lookup: {from: "passages", localField: "passages.passageId", foreignField: "_id", as: "passages" } },
                // { $lookup: {from: "WordData", localField: 'workbook.preview.wordid', foreignField: "wordid", as: "fullWords"} },
            ];
            courseWorkbook
                .aggregate(pipeline)
                .then((result:any) => {
                    resolve(result);
                })
                .catch((error:any) => {
                    reject(error);
                })
        });
    }

    update(id: string, data: any): Promise<any> {
        return courseWorkbook.update({_id: ObjectId(id)}, {$set: data});
    }
    async updateByWorkbook(id: string, workbookId: string, data: any): Promise<any> {
        workbookId = ObjectId.isValid(workbookId) ? ObjectId(workbookId) : workbookId;
        let wordids = data.preview.filter((word: any) => word)
        .map((word: any) => parseInt(word.wordid))
        console.log('word ids', wordids)
        let wordsObj = await words.find({wordid: {$in: wordids}})
        let sentenceObj = await workbookSentence.find({_id: workbookId});
        let passageObj = await workbookPassage.find({_id: workbookId});
        let phraseObj = await workbookPhrase.find({_id: workbookId});
        let fileObj = await workbookFile.find({_id: workbookId});
        console.log('passages', passageObj)
        return courseWorkbook.update(
            {ownerKey: id, workbookId: workbookId}, 
            {$set: {
                workbook: [data], 
                fullWords: wordsObj,
                sentences: sentenceObj,
                passages: passageObj,
                phrases: phraseObj,
                files: fileObj
            }},
            {multi: true}
        );
    }

    deleteByWorkbookId(workbookId: string): Promise<any> {
        workbookId = ObjectId.isValid(workbookId) ? ObjectId(workbookId) : workbookId;
        return courseWorkbook.remove({workbookId: workbookId});
    }

    getByCourseId(courseId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // aggregating with workbook lookup to remove results whose workbooks have been deleted but somehow
            // whose courseworkbooks weren't
            const pipeline = [
                { $match: { "courseId": ObjectId.isValid(courseId) ? ObjectId(courseId) : courseId }},
                { $lookup: {from: "workbook", localField: "workbookId", foreignField: "_id", as: "workbook" } },
                { $unwind: "$workbook"},
            ]
            courseWorkbook
                .aggregate(pipeline)
                .then((courseWorkbooks:any[]) => {
                    courseWorkbooks = courseWorkbooks.map(cw => {
                        delete cw.workbook;
                        return cw;
                    })

                    resolve(courseWorkbooks);
                })
                .catch((error:any) => {
                    reject(error)
                });
        });

    }

    deleteFromCourseWorkbookByWorkbookId(workbookId: string, courseId: any): Promise<any> {
        courseId = ObjectId.isValid(courseId) ? ObjectId(courseId) : courseId
        workbookId = ObjectId.isValid(workbookId) ? ObjectId(workbookId) : workbookId;
        return courseWorkbook.remove({courseId: courseId, workbookId: workbookId});
    }

    getCountByWorkbookId(workbookId: string): Promise<any> {
        workbookId = ObjectId.isValid(workbookId) ? ObjectId(workbookId) : workbookId;
        return courseWorkbook.count({workbookId: workbookId});
    }

}

export {CourseWorkbookMongoDao};
