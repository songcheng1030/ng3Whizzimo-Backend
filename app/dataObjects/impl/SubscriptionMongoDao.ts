import {injectable} from "inversify";
import ISubscriptionMongoDao from "../ISubscriptionMongoDao";
import {subscription} from '../../db';
const ObjectId = require('bson-objectid');

@injectable()
export class SubscriptionMongoDao implements ISubscriptionMongoDao {
    create(data: any): Promise<any> {
        data.courseId = ObjectId.isValid(data.courseId) ? ObjectId(data.courseId) : data.courseId;
        return new Promise((resolve, reject) => {
           subscription
               .insert(data)
               .then((result: any) => resolve(result))
               .catch((error: any) => reject(error));
        });
    }

    createMany(data: any[]): Promise<any> {
        data.forEach((dt)=>{
            dt.courseId = ObjectId.isValid(dt.courseId) ? ObjectId(dt.courseId) : dt.courseId;
        })
        return new Promise((resolve, reject) => {
           subscription
               .insertMany(data)
               .then((result: any) => resolve(result))
               .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            subscription
                .remove({_id: id})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            subscription
                .find({_id: id})
                .then((result: any) => {
                    if(result.length === 0) {
                        return resolve(null);
                    }

                    resolve(result[0])
                })
                .catch((error: any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            let pipeline = [
                { $match: { "userId": ObjectId.isValid(id) ? ObjectId(id) : id }},
                {$lookup:{from:"course", localField: "courseId", foreignField: "_id", as: "course"}},
            ];

            subscription
                .aggregate(pipeline)
                .then((result: any) => {
                    const sharedCourses = result
                        .filter((course: any) => course.course.length > 0)
                        .map((course: any) => {
                            course.course[0].subscriptionId = course._id;
                            return course.course[0]
                        });

                    return resolve(sharedCourses);
                })
                .catch((error: any) => reject(error));
        });
    }

    update(id: string, data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}
