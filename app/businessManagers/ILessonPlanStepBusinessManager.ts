import ILessonPlanStepBase from "../shared/ILessonPlanStepBase";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";

export default interface ILessonPlanStepBusinessManager extends ILessonPlanStepBase, IProtectedRequestBase {
    copy(lessonPlanStepId:string, newLessonPlanId:string, courseId:string, courseWorkbooks:any[], ownerKey: string, changeName:boolean):Promise<any>;
    updateMany(lessonPlanSteps: any[]): Promise<any>;
}
