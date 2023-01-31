import {injectable} from "inversify";
import {course} from '../../db';
const ObjectId = require('bson-objectid');
import ICourseBase from "../../shared/ICourseBase";

@injectable()
class CourseMongoDao implements ICourseBase{
    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            course
                .insert(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            id = ObjectId.isValid(id) ? ObjectId(id) : id;

            course
                .remove({_id: id})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            id = ObjectId.isValid(id) ? ObjectId(id) : id;
            course
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

    getBySharedKey(sharedKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            course
                .find({sharedKey: sharedKey})
                .then((result: any) => {
                    if (result.length === 0) {
                        return resolve(null);
                    }

                    resolve(result[0])
                })
                .catch((error: any) => reject(error));
        });
    }

    getMany(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            course
                .find({teacherKey: userId}, {courseName: 1, teacherKey: 1, order: 1})
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => reject(error));

        }) ;
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            id = ObjectId.isValid(id) ? ObjectId(id) : id;

            course.update({_id: id}, {$set: data})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }
}

export {CourseMongoDao};
