import {injectable} from "inversify";
import ICourseBase from "../../../app/shared/ICourseBase";

@injectable()
class CourseMockDao implements ICourseBase {
    private static db:any[] = [
        {
            _id: "1",
            courseType: "Class",
            firstname: "Untitled",
            teacherKey: "WhizzimoAcademy:1"
        },
        {
            _id: "2",
            courseType: "Class",
            firstname: "Amy Herd",
            notes: "This course covers common phonics concepts taught in an early or remedial literacy program.",
            teacherKey: "WhizzimoAcademy:53",
            type: "Default/Practice Student"
        }
    ];

    create(data: any): Promise<any> {
        return new Promise((resolve) => {
            CourseMockDao.db.push(data);
            resolve(data);
        });
    }

    delete(id: string): Promise<any> {
        return undefined;
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(CourseMockDao.db.find(course => course._id === id));
        });
    }

    getBySharedKey(sharedKey: string): Promise<any> {
        return undefined;
    }

    getMany(id: string): Promise<any> {
        return new Promise((resolve) => {
            const course = CourseMockDao.db.filter(course => course.teacherKey === id);
            resolve(course);
        });
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }

}

export {CourseMockDao};
