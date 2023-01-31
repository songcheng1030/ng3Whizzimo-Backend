import IPaymentBase from "../shared/IPaymentBase";

export default interface IPaymentStripeDao extends IPaymentBase {
    updateSubscription(customerId: string, updatedSubsctiption: any): Promise<any>;
}
