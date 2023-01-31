import IRequestBase from "./IRequestBase";

export default interface IBundleContentBase extends IRequestBase {
    deleteByBundleId(bundleId:string):Promise<any>;
    deleteByContentId(contentId:string):Promise<any>;
    deleteManyByContentId(contentIds:string[]):Promise<any>;
}
