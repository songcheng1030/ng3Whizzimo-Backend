import ILessonPlanStepMongoDao from "../ILessonPlanStepMongoDao";
import {inject, injectable} from "inversify";
import ILessonPlanStepBase from "../../shared/ILessonPlanStepBase";
import {course, lessonPlan} from "../../db";
import TYPES from "../../../types";
import ILessonPlanBase from "../../shared/ILessonPlanBase";
const {lessonPlanSteps, courseWorkbooks, workbooks} = require('../../db');
const ObjectId = require('bson-objectid');

@injectable()
class LessonPlanStepMongoDao implements ILessonPlanStepBase {
    _lessonPlanDao: ILessonPlanBase;

    constructor(@inject(TYPES.LessonPlanDataObject) lessonPlanDao:ILessonPlanBase) {
        this._lessonPlanDao = lessonPlanDao;
    }

    async create(data: any): Promise<any> {
        data.courseWorkbookId = ObjectId.isValid(data.courseWorkbookId) ? ObjectId(data.courseWorkbookId) : data.courseWorkbookId;
        data.lessonPlanId = ObjectId.isValid(data.lessonPlanId) ? ObjectId(data.lessonPlanId) : data.lessonPlanId;
        // let workbook = await workbooks.find({})
        console.log('lesson plan step data', data)

        const result = await lessonPlanSteps.insert(data);
        await this._lessonPlanDao.createLessonPlanStep(result);

        return Promise.resolve(result);
    }

    async delete(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
           this.get(id)
               .then((lps: any) => {
                   if (!lps) {
                       return null;
                   }
                    return this._lessonPlanDao.deleteLessonPlanStep(lps.lessonPlanId, id);
                })
                .then(() => {
                    return  lessonPlanSteps.remove({_id: id});
                })
               .then((result: any) => {
                   resolve(result);
               })
               .catch((error:any) => {
                   reject(error);
               });
        });
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: { "_id": ObjectId.isValid(id) ? ObjectId(id) : id }},
                // { $lookup: {from: "workbook", localField: "workbookId", foreignField: "_id", as: "workbook" } },
                // { $unwind: "$workbook"}
            ];
            lessonPlanSteps.aggregate(pipeline)
                .then((result: any) => {
                    resolve(result[0])
                })
                .catch((error:any) => {
                    reject(error);
                });
        });

    }

    getMany(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;

        return new Promise((resolve, reject) => {
            lessonPlanSteps
                .find({lessonPlanId: id})
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error:any) => {
                    reject(error);
                });;
        });
    }

    async update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        data.courseWorkbookId = ObjectId.isValid(data.courseWorkbookId) ? ObjectId(data.courseWorkbookId) : data.courseWorkbookId;
        data.workbookId = ObjectId.isValid(data.workbookId) ? ObjectId(data.workbookId) : data.workbookId;

        const result = await lessonPlanSteps.update({_id: id}, {$set: data});
        return Promise.resolve(result);
    }

    async updateFilesByWorkbookId(workbookId: string, data: any): Promise<any> {
      
        return new Promise((resolve, reject) => {
            lessonPlanSteps
                .find({workbookId: workbookId})
                .then((result: any) => {
                    const updatedLessonSteps = result.map((lessonPlanStep: any) => {
                        const files = lessonPlanStep.files?.map((file: any) => {
                            if(file._id === data._id) {
                                return data;
                            }
                            return file;
                        })
      
                        return {
                            ...lessonPlanStep,
                            files
                        };
                    })
      
                    return updatedLessonSteps;
                })
                .then((updatedLessonPlanSteps: any) => {
                    updatedLessonPlanSteps.map(async (lessonPlanStep: any) => {
                        await lessonPlanSteps.update({_id: lessonPlanStep._id}, {$set: lessonPlanStep});
                        return lessonPlanStep;
                    })
                    resolve(updatedLessonPlanSteps);
                })
                .catch((error:any) => {
                    reject(error);
                });
        });
    }

    deleteByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        courseWorkbookId = ObjectId.isValid(courseWorkbookId) ? ObjectId(courseWorkbookId) : courseWorkbookId;
        return  lessonPlanSteps.remove({courseWorkbookId: courseWorkbookId});
    }

    deleteByWorkbookId(workbookId: string): Promise<any> {
        workbookId = ObjectId.isValid(workbookId) ? ObjectId(workbookId) : workbookId;
        return lessonPlanSteps.remove({workbookId: workbookId});
    }

    deleteByCourseId(courseId: string): Promise<any> {
        courseId = ObjectId.isValid(courseId) ? ObjectId(courseId) : courseId;
        return lessonPlanSteps.remove({courseId: courseId});
    }

    deleteByLessonPlanId(lessonPlanId:string): Promise<any> {
        lessonPlanId = ObjectId.isValid(lessonPlanId) ? ObjectId(lessonPlanId) : lessonPlanId;
        return lessonPlanSteps.remove({lessonPlanId: lessonPlanId});
    }

    getManyIds(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return lessonPlanSteps.find({lessonPlanId: id}, {_id: 1});
    }

    getCountByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        courseWorkbookId = ObjectId.isValid(courseWorkbookId) ? ObjectId(courseWorkbookId) : courseWorkbookId;
        return lessonPlanSteps.count({courseWorkbookId: courseWorkbookId});
    }

    getCountByWorkbookId(workbookId: string): Promise<any> {
        workbookId = ObjectId.isValid(workbookId) ? ObjectId(workbookId) : workbookId;
        return lessonPlanSteps.count({workbookId: workbookId});
    }

}

export {LessonPlanStepMongoDao};
