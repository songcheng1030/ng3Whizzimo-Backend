import ILessonPlanDataManager from "../ILessonPlanDataManager";
import TYPES from "../../../types";
import {inject, injectable} from "inversify";
import ILessonPlanBase from "../../shared/ILessonPlanBase";

@injectable()
class LessonPlanDataManager implements ILessonPlanDataManager {
    _dao: ILessonPlanBase;

    constructor(
        @inject(TYPES.LessonPlanDataObject) dao:ILessonPlanBase
    ) {
        this._dao = dao;
    }

    create(data: any): Promise<any> {
        return this._dao.create(data);
    }

    delete(id: string): Promise<any> {
        return this._dao.delete(id);
    }

    get(id: string): Promise<any> {
        return this._dao.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._dao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

    deleteByCourseId(courseId: string): Promise<any> {
        return this._dao.deleteByCourseId(courseId);
    }

    getManyIds(id: string): Promise<any> {
        return this._dao.getManyIds(id);
    }

    getManyWithSteps(courseId: string): Promise<any> {
        return this._dao.getManyWithSteps(courseId);
    }

    createLessonPlanStep(data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    deleteLessonPlanStep(lessonPlanId: string, lessonPlanStepId: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    getFirstLessonPlanStep(lessonPlanId: string): Promise<any> {
        return this._dao.getFirstLessonPlanStep(lessonPlanId);
    }

    updateLessonPlanStep(id: string, data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}

export {LessonPlanDataManager};
