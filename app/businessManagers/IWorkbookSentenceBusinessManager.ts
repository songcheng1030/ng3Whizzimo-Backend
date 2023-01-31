import IWorkbookSentenceBase from "../shared/IWorkbookSentenceBase";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";

export default interface IWorkbookSentenceBusinessManager extends IWorkbookSentenceBase {
    copy(workbookId:string, newWorkbookId:string, ownerKey:string):Promise<any>
}
