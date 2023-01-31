import ICourseWorkbookBase from "../shared/ICourseWorkbookBase";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";

export default interface ICourseWorkbookBusinessManager extends ICourseWorkbookBase, IProtectedRequestBase {
    copy(courseWorkbookId: string, courseId: string, ownerKey: string, changeName: boolean): Promise<any>;

}
