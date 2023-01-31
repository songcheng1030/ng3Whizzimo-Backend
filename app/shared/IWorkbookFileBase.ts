import IWorkbookWordGroupBase from "./IWorkbookWordGroupBase";

export default interface IWorkbookFileBase extends IWorkbookWordGroupBase {
    clone(data: any): Promise<any>;
}
