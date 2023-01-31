import IWorkbookBase from "../shared/IWorkbookBase";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";

export default interface IWorkbookBusinessManager extends IWorkbookBase, IProtectedRequestBase {
    copy(workbookId:string, ownerKey:string, changeName:boolean):Promise<any>;
    getWorkbookLibrary():Promise<any>;
}
