import ISubscriptionBase from "../shared/ISubscriptionBase";

export default interface ISubscriptionDataManager extends ISubscriptionBase {
    createMany(data: any[]): Promise<any>;
}
