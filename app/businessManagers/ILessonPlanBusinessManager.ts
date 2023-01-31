import ILessonPlanBase from "../shared/ILessonPlanBase";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";

export default interface ILessonPlanBusinessManager extends ILessonPlanBase, IProtectedRequestBase {
    copy(lessonPlanId:string, newCourseId:string, courseWorkbooks:any[], ownerKey: string, changeName:boolean):Promise<any>;
}
