import IWorkbookPassageBase from "../shared/IWorkbookPassageBase";

export default interface IWorkbookPassageBusinessManager extends IWorkbookPassageBase {
    copy(workbookId:string, newWorkbookId:string, ownerKey:string):Promise<any>;
}
