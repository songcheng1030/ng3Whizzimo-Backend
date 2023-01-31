import {injectable} from "inversify";
import ILessonPlanStepBase from "../../../app/shared/ILessonPlanStepBase";
import {Errors} from "../../../app/constants/Errors";

@injectable()
class LessonPlanMockDao implements ILessonPlanStepBase {
    private db:any[] = [
        {
            _id: "1",
            order: 0,
            courseId: "1",
            name: "Lesson Plan on Sunday, March 20, 2016",
            notes: "Tap here to type a few notes in this Lesson Plan",
            status: "draft"
        },
        {
            _id: "2",
            order: 0,
            courseId: "2",
            name: "Lesson Plan on Sunday, March 20, 2016",
            notes: "",
            status: "teaching"
        }
    ];

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.push(data);
            resolve(null);
        });
    }

    delete(id: string): Promise<any> {
        return undefined;
    }

    deleteByCourseId(courseId: string): Promise<any> {
        return undefined;
    }

    deleteByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        return undefined;
    }

    deleteByLessonPlanId(lessonPlanId: string): Promise<any> {
        return undefined;
    }

    deleteByWorkbookId(workbookId: string): Promise<any> {
        return undefined;
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let obj = this.db.find(lessonPlan => lessonPlan._id === id);
            resolve(obj);
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    getManyIds(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let objIndex = this.db.findIndex(lessonPlan => lessonPlan._id === id);
            let obj = this.db[objIndex];
            obj = {...obj, ...data};
            this.db[objIndex] = obj;
        });
    }

    getCountByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    getCountByWorkbookId(workbookId: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    updateFilesByWorkbookId(workbookId: string, data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}

export {LessonPlanMockDao};
