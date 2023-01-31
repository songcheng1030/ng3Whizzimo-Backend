import IPaymentBase from "../shared/IPaymentBase";

export default interface IPaymentBusinessManager extends IPaymentBase {
    updatePaymentSubscription(customerId: string, planId: string, promoId:string, isDowngrade: boolean, billing_cycle_anchor: string, proration_behavior: string, start_date: number): Promise<any>;
}
