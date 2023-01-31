import IWorkbookFileBase from "../shared/IWorkbookFileBase";

export default interface IWorkbookFileBusinessManager extends IWorkbookFileBase {
    copy(workbookId:string, newWorkbookId:string, ownerKey:string):Promise<any>;
    createMany(data: any): Promise<any[]>;
}
