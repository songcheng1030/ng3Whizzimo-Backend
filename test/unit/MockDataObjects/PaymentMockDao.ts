import {injectable} from "inversify";
import IPaymentBase from "../../../app/shared/IPaymentBase";

@injectable()
class PaymentMockDao implements IPaymentBase {
    private db:any[] = [
        {
            id: "1",
            account_balance: 0,
            address: "444 Test St.",
            name: "John Test"
        }
    ];

    private promodb:any[] = [
        {
            code: '100 percent',
            valid: true
        }
    ];
    cancelSubscription(subscriptionId: string): Promise<any> {
        return undefined;
    }

    cancelScheduledSubscription(scheduledSubscriptionId: string): Promise<any> {
        return undefined;
    }
    
    cancelAtEndOfSubscription(subscriptionId: string, updatedSubscription: any): Promise<any> {
        return undefined;
    }

    createCard(customerId: string, source: any): Promise<any> {
        return undefined;
    }

    createCardToken(card: any): Promise<any> {
        return undefined;
    }

    createCustomer(data: any): Promise<any> {
        return new Promise((resolve) => {
            data.id = Date.now().toString();
            this.promodb.push(data);
            resolve(data);
        });
    }

    createInvoice(customerId: string): Promise<any> {
        return undefined;
    }

    createSubscription(subscription: any): Promise<any> {
        return undefined;
    }

    scheduleNewPlan(subscription: any, start_date: number): Promise<any> {
        return undefined;
    }

    deleteCard(customerId: string, cardId: string): Promise<any> {
        return undefined;
    }

    deleteCustomer(customerId: string): Promise<any> {
        return undefined;
    }

    getCards(customerId: string): Promise<any> {
        return undefined;
    }

    getCustomer(customerId: string): Promise<any> {
        return undefined;
    }

    getProduct(productId: string): Promise<any> {
        return undefined;
    }

    getPromo(promoCode: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let promo = this.promodb.find(promo => promo.code === promoCode);
            if(!promo) {
                promo = {valid: false}
            }

            resolve(promo);
        });
    }

    deleteCustomerPromo(customerId: string): Promise<any> {
        return undefined;
    }

    deleteSubscriptionPromo(subscriptionId: string): Promise<any> {
        return undefined;
    }

    getSubscription(subscriptionId: string): Promise<any> {
        return undefined;
    }

    getAllSubscriptions(customerId: string): Promise<any> {
        return undefined;
    }

    getUpcomingInvoice(customerId: string): Promise<any> {
        return undefined;
    }

    updateCustomer(customerId: string, updatedCustomerFields: any): Promise<any> {
        return undefined;
    }

    updateSubscription(customerId: string, updatedSubsctiption: any): Promise<any> {
        return undefined;
    }
    validateCreditCard(creditCard: any): Promise<any>{
        return undefined;
    }


}

export {PaymentMockDao};
