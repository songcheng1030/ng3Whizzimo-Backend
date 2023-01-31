import IWorkbookPhraseBase from "../shared/IWorkbookPhraseBase";

export default interface IWorkbookPhraseBusinessManager extends IWorkbookPhraseBase{
    copy(workbookId:string, newWorkbookId:string, ownerKey:string):Promise<any>;
}
