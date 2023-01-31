import ISubscriptionBase from "../shared/ISubscriptionBase";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";

export default interface ISubscriptionBusinessManager extends ISubscriptionBase, IProtectedRequestBase {
    protectedCreateMany(data: any[], locals: any): Promise<any>;
}
