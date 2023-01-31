import IWorkbookWordGroupBase from "./IWorkbookWordGroupBase";

export default interface IWorkbookPhraseBase extends IWorkbookWordGroupBase {
    clone(data: any): Promise<any>;

}
