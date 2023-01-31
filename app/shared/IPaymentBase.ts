export default interface IPaymentBase {
    getAllSubscriptions(customerId: string): Promise<any>;
    getCustomer(customerId: string): Promise<any>;
    updateCustomer(customerId: string, updatedCustomerFields: any): Promise<any>;
    createCustomer(data: any): Promise<any>
    deleteCustomer(customerId: string): Promise<any>;
    getProduct(productId: string): Promise<any>;
    createCardToken(card: any): Promise<any>;
    createCard(customerId: string, source: any): Promise<any>;
    getCards(customerId: string): Promise<any>;
    deleteCard(customerId: string, cardId: string): Promise<any>;
    getPromo(promoCode: string): Promise<any>;
    deleteCustomerPromo(customerId: string): Promise<any>;
    deleteSubscriptionPromo(subscriptionId: string): Promise<any>;
    getSubscription(subscriptionId: string): Promise<any>;
    createSubscription(subscription: any): Promise<any>;
    scheduleNewPlan(subscription: any, start_date: number): Promise<any>;
    cancelSubscription(subscriptionId: string): Promise<any>;
    cancelScheduledSubscription(scheduledSubscriptionId: string): Promise<any>;
    getUpcomingInvoice(customerId: string): Promise<any>;
    createInvoice(customerId: string): Promise<any>;
    updateSubscription(subscriptionId: string, updatedSubsctiption: any): Promise<any>;
    cancelAtEndOfSubscription(subscriptionId: string, updatedSubsctiption: any): Promise<any>;
    validateCreditCard(creditCard: any): Promise<any>;
}
