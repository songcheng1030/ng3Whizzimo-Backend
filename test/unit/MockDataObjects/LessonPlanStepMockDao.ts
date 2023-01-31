import {injectable} from "inversify";
import ILessonPlanStepBase from "../../../app/shared/ILessonPlanStepBase";

@injectable()
class LessonPlanStepMockDao implements ILessonPlanStepBase {
    private db:any[] = [
        {
            _id: 1,
            courseWorkbookId: 1,
            lessonPlanId: 1,
            activity: 'Spelling',
            activityName: 'Spelling',
            name:'Test Step',
            words: [],
            tiles: []
        },
        {
            _id: 2,
            courseWorkbookId: 1,
            lessonPlanId: 1,
            activity: 'Spelling',
            activityName: 'Spelling',
            name:'Test Step',
            words: [],
            tiles: []
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
            const lessonPlanStep = this.db.find(lps => lps._id === id);
            resolve(lessonPlanStep);
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    getManyIds(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
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

export {LessonPlanStepMockDao};
