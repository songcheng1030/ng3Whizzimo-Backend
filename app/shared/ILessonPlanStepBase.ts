import IRequestBase from "./IRequestBase";

export default interface ILessonPlanStepBase extends IRequestBase {
    getManyIds(id:string):Promise<any>;
    getCountByWorkbookId(workbookId: string):Promise<any>;
    getCountByCourseWorkbookId(courseWorkbookId: string):Promise<any>;
    deleteByCourseWorkbookId(courseWorkbookId:string):Promise<any>;
    deleteByWorkbookId(workbookId:string):Promise<any>;
    deleteByCourseId(courseId:string):Promise<any>;
    deleteByLessonPlanId(lessonPlanId:string):Promise<any>;
    updateFilesByWorkbookId(workbookId: string, data: any): Promise<any>;
}
