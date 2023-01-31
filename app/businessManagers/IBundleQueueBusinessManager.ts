import IBundleQueueBase from "../shared/IBundleQueueBase";

export default interface IBundleQueueBusinessManager extends IBundleQueueBase {
    send(data:any):Promise<any>;
}
