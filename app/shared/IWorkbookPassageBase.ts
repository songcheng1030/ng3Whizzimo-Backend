import IWorkbookWordGroupBase from "./IWorkbookWordGroupBase";

export default interface IWorkbookPassageBase extends IWorkbookWordGroupBase {
    clone(data: any): Promise<any>;

}
