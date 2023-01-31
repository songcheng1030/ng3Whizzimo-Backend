import ICourseWorkbookActivityBase from "../shared/ICourseWorkbookActivityBase";
import ICourseWorkbookBase from "../shared/ICourseWorkbookBase";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";

export default interface ICourseWorkbookActivityBusinessManager extends ICourseWorkbookActivityBase, IProtectedRequestBase {
    createFromUserActivitySettings(courseWorkbook: any, activityTypeId: string): Promise<any>;
    copy(courseWorkbookActivityId: string, courseWorkbookId: string): Promise<any>;
    copyFromCourseWorkbookId(courseWorkbookId: string, destCourseWorkbookId: string): Promise<void>;
}
