import IWorkbookWordGroupBase from "./IWorkbookWordGroupBase";

export default interface IWorkbookSentenceBase extends IWorkbookWordGroupBase {
    clone(data: any): Promise<any>;
}
