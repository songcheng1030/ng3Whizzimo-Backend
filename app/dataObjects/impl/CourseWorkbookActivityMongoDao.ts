
import ICourseWorkbookActivityBase from "../../shared/ICourseWorkbookActivityBase";
import {injectable} from "inversify";
const {courseWorkbookActivity} = require('../../db');
const ObjectId = require('bson-objectid');

@injectable()
class CourseWorkbookActivityMongoDao implements ICourseWorkbookActivityBase{
    create(data: any): Promise<any> {
        data.courseWorkbookId = ObjectId(data.courseWorkbookId);
        data.activityTypeId = data.activityTypeId;
        return courseWorkbookActivity.insert(data);
    }

    delete(id: string): Promise<any> {
        return courseWorkbookActivity.remove({_id: ObjectId(id)});
    }

    get(id: string): Promise<any> {
        return courseWorkbookActivity.find({_id: ObjectId(id)});
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
                data.courseWorkbookId = ObjectId(data.courseWorkbookId);
                data.activityTypeId = ObjectId.isValid(data.activityTypeId) ? ObjectId(data.activityTypeId) : data.activityTypeId;
                delete data._id;
                courseWorkbookActivity
                    .update(
                        {courseWorkbookId: data.courseWorkbookId, activityTypeId: data.activityTypeId},
                        {$set: data},
                        {multi: true}
                    )
                    .then((result: any) => {
                        resolve(result);
                    })
                    .catch((error: any) => {
                        reject(error);
                    });
        });

    }

    getByCourseWorkbookAndActivityType(courseWorkbookId: string, activityTypeId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            courseWorkbookActivity.find({
                courseWorkbookId: ObjectId.isValid(courseWorkbookId) ? ObjectId(courseWorkbookId) : courseWorkbookId,
                activityTypeId: activityTypeId
            }).then(
                (result: any) => {
                    if(result.length === 0) {
                        return resolve(null);
                    }

                    resolve(result[0]);
                },
                (error: any) => {
                    reject(error);
                }
            );
        })
    }

    updateByWorkbookId(workbookId: string, updatedCourseWorkbookActivity: any): Promise<any> {
        workbookId = ObjectId.isValid(workbookId) ? ObjectId(workbookId) : workbookId;
        updatedCourseWorkbookActivity.courseWorkbookId = ObjectId(updatedCourseWorkbookActivity.courseWorkbookId);
        updatedCourseWorkbookActivity.activityTypeId = ObjectId(updatedCourseWorkbookActivity.activityTypeId);
        return courseWorkbookActivity.update({workbookId: workbookId}, {$set: updatedCourseWorkbookActivity});
    }

    getByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        courseWorkbookId = ObjectId.isValid(courseWorkbookId) ? ObjectId(courseWorkbookId) : courseWorkbookId;
        return courseWorkbookActivity.find({courseWorkbookId: courseWorkbookId});
    }
}

export {CourseWorkbookActivityMongoDao};
