import IPaymentBase from "../shared/IPaymentBase";

export default interface IPaymentDataManager extends IPaymentBase {
    getAllSubscriptions(customerId: string): Promise<any>;
    updateSubscription(customerId: string, updatedSubsctiption: any): Promise<any>;
    scheduleNewPlan(subscription: any, start_date: number): Promise<any>;
    deleteCustomerPromo(customerId: string): Promise<any>;
    deleteSubscriptionPromo(subscriptionId: string): Promise<any>;
    cancelAtEndOfSubscription(subscriptionId: string, updatedSubscription: any): Promise<any>;
}
