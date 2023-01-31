import IRequestBase from "./IRequestBase";

export default interface ICourseWorkbookBase extends IRequestBase {
    deleteByWorkbookId(workbookId:string):Promise<any>;
    deleteFromCourseWorkbookByWorkbookId(workbookId: string, courseId: any):Promise<any>;
    getByCourseId(courseId:string):Promise<any>;
    getNonMerged(id: string):Promise<any>;
    getCountByWorkbookId(workbookId: string):Promise<any>;
    updateByWorkbook(id: string, workbookId: string, data: any):Promise<any>;
}
