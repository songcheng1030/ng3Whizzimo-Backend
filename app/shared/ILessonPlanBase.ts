import IRequestBase from "./IRequestBase";

export default interface ILessonPlanBase extends IRequestBase {
    getManyIds(id:string):Promise<any>;
    deleteByCourseId(courseId:string):Promise<any>;
    getManyWithSteps(courseId:string):Promise<any>;

    getFirstLessonPlanStep(lessonPlanId: string): Promise<any>;
    createLessonPlanStep(data: any): Promise<any>;
    deleteLessonPlanStep(lessonPlanId: string, lessonPlanStepId: string): Promise<any>;
}
