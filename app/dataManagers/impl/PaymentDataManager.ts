import IPaymentDataManager from "../IPaymentDataManager";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import IPaymentStripeDao from "../../dataObjects/IPaymentStripeDao";
import IPaymentBase from "../../shared/IPaymentBase";

@injectable()
class PaymentDataManager implements IPaymentDataManager {
    private _dao: IPaymentBase;

    public constructor(
        @inject(TYPES.PaymentDataObject) dao:IPaymentBase
    ) {
        this._dao = dao;
    }

    cancelSubscription(subscriptionId: string): Promise<any> {
        return this._dao.cancelSubscription(subscriptionId);
    }

    cancelScheduledSubscription(scheduledSubscriptionId: string): Promise<any> {
        return this._dao.cancelScheduledSubscription(scheduledSubscriptionId);
    }
    cancelAtEndOfSubscription(subscriptionId: string, updatedSubscription: any): Promise<any> {
        return this._dao.cancelAtEndOfSubscription(subscriptionId, updatedSubscription);
    }

    createCard(customerId: string, source: any): Promise<any> {
        return this._dao.createCard(customerId, source);
    }

    createCardToken(card: any): Promise<any> {
        return this._dao.createCardToken(card);
    }

    createCustomer(data: any): Promise<any> {
        return this._dao.createCustomer(data);
    }

    createInvoice(customerId: string): Promise<any> {
        return this._dao.createInvoice(customerId);
    }

    createSubscription(subscription: any): Promise<any> {
        return this._dao.createSubscription(subscription);
    }

    scheduleNewPlan(subscription: any, start_date: number): Promise<any> {
        return this._dao.scheduleNewPlan(subscription, start_date);
    }

    deleteCard(customerId: string, cardId: string): Promise<any> {
        return this._dao.deleteCard(customerId, cardId);
    }

    deleteCustomer(customerId: string): Promise<any> {
        return this._dao.deleteCustomer(customerId);
    }

    getCards(customerId: string): Promise<any> {
        return this._dao.getCards(customerId);
    }

    getCustomer(customerId: string): Promise<any> {
        return this._dao.getCustomer(customerId);
    }

    getProduct(productId: string): Promise<any> {
        return this._dao.getProduct(productId);
    }

    getPromo(promoCode: string): Promise<any> {
        return this._dao.getPromo(promoCode);
    }

    deleteCustomerPromo(customerId: string): Promise<any> {
        return this._dao.deleteCustomerPromo(customerId);
    }

    deleteSubscriptionPromo(subscriptionId: string): Promise<any> {
        return this._dao.deleteSubscriptionPromo(subscriptionId);
    }

    getSubscription(subscriptionId: string): Promise<any> {
        return this._dao.getSubscription(subscriptionId);
    }
    getAllSubscriptions(customerId: string): Promise<any> {
        return this._dao.getAllSubscriptions(customerId);
    }
    getUpcomingInvoice(customerId: string): Promise<any> {
        return this._dao.getUpcomingInvoice(customerId);
    }

    updateCustomer(customerId: string, updatedCustomerFields: any): Promise<any> {
        return this._dao.updateCustomer(customerId, updatedCustomerFields);
    }

    updateSubscription(subscriptionId: string, updatedSubscription: any): Promise<any> {
        return this._dao.updateSubscription(subscriptionId, updatedSubscription);
    }

    validateCreditCard(creditCard: any): Promise<any> {
        return this._dao.validateCreditCard(creditCard);
    }
}

export {PaymentDataManager};
