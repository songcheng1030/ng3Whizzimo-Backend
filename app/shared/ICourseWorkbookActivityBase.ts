import IRequestBase from "./IRequestBase";

export default interface ICourseWorkbookActivityBase {
    get(id: string): Promise<any>;
    getByCourseWorkbookId(courseWorkbookId: string): Promise<any>;
    getByCourseWorkbookAndActivityType(courseWorkbookId: string, activityTypeId: string): Promise<any>;
    updateByWorkbookId(workbookId: string, updatedCourseWorkbookActivity: any): Promise<any>;
    create(data: any): Promise<any>;
}
