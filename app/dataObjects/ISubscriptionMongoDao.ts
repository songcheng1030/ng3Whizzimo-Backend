import ISubscriptionBase from "../shared/ISubscriptionBase";

export default interface ISubscriptionMongoDao extends ISubscriptionBase {
    createMany(data: any[]): Promise<any>;
}
