import IRequestBase from "./IRequestBase";

export default interface IWorkbookBase extends IRequestBase {
    getManyById(ids:string[]):Promise<any>;
}
