import {injectable} from "inversify";
import {student} from '../../db';
import Student from "../../models/Student";
import IStudentBase from "../../shared/IStudentBase";
const ObjectId = require('bson-objectid');

@injectable()
class StudentMongoDao implements IStudentBase {
    create(data: Student): Promise<any> {
        return new Promise((resolve, reject) => {
           student
               .insert(data)
               .then((result: any) => resolve(result))
               .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            student
                .remove({userId: id})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
           student
               .find({_id: id})
               .then((result: any) => resolve(result))
               .catch((error: any) => reject(error));
        });
    }

    update(id: string, data: any): Promise<any> {
        id = ObjectId.isValid(id) ? ObjectId(id) : id;
        return new Promise((resolve, reject) => {
            student
                .update({_id: id}, {$set: data})
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

}

export {StudentMongoDao};
