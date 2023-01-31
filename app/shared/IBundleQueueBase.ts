import IRequestBase from "./IRequestBase";

export default interface IBundleQueueBase extends IRequestBase {
    deleteByBundleId(bundleId:string):Promise<any>;
}
