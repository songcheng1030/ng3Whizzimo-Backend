import {injectable} from "inversify";
import IStudentBase from "../../../app/shared/IStudentBase";
import Student from "../../../app/models/Student";

@injectable()
class StudentMockDao implements IStudentBase {
    private static db:Student[] = [
        {
            teacherId: '1',
            userId: '1'
        }
    ];

    create(data: Student): Promise<any> {
        return new Promise((resolve) => {
            StudentMockDao.db.push(data);
            resolve(null);
        });
    }

    delete(id: string): Promise<any> {
        return undefined;
    }

    get(id: string): Promise<any> {
        return new Promise((resolve) => {
            const user = StudentMockDao.db.find(user => user.userId === id);
            resolve(user);
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }

}

export {StudentMockDao};
