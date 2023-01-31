import IPaymentBusinessManager from "../IPaymentBusinessManager";
import IPaymentDataManager from "../../dataManagers/IPaymentDataManager";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import INameToValueMap from "../../shared/INameToValueMap";
import {Errors} from "../../constants/Errors";
import IPlanBusinessManager from "../IPlanBusinessManager";

@injectable()
class PaymentBusinessManager implements IPaymentBusinessManager {

    private _paymentDataManager: IPaymentDataManager;
    private _planBusinessManager: IPlanBusinessManager;

    constructor(
        @inject(TYPES.PaymentDataManager) paymentDataManager: IPaymentDataManager,
        @inject(TYPES.PlanBusinessManager) planBusinessManager: IPlanBusinessManager
    ) {
        this._paymentDataManager = paymentDataManager;
        this._planBusinessManager = planBusinessManager;
    }

    cancelSubscription(subscriptionId: string): Promise<any> {
        return this._paymentDataManager.cancelSubscription(subscriptionId);
    }

    cancelScheduledSubscription(scheduledSubscriptionId: string): Promise<any> {
        return this._paymentDataManager.cancelScheduledSubscription(scheduledSubscriptionId);
    }

    cancelAtEndOfSubscription(subscriptionId: string, updatedSubscription: any): Promise<any> {
        return this._paymentDataManager.cancelAtEndOfSubscription(subscriptionId, updatedSubscription);
    }

    createCard(customerId: string, cardToken: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._paymentDataManager
                .getCards(customerId)
                .then((cards: any) => {
                    let deleteRequests: any[] = [];

                    if (cards.data.length === 0) {
                        return null;
                    }

                    cards.data.forEach((card: any) => {
                        deleteRequests.push(this._paymentDataManager.deleteCard(customerId, card.id))
                    });

                    return Promise.all(deleteRequests);
                })
                .then(() => this._paymentDataManager.createCard(customerId, {source: cardToken}))
                .then((card: any) => resolve(card))
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    createCardToken(card: any): Promise<any> {
        return this._paymentDataManager.createCardToken(card);
    }

    createCustomer(data: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if(((!data.firstName || data.firstName === '') && (!data.lastName || data.lastName === '')) && !data.email) {
                return reject(Errors.missingParametersBody);
            }

            const plans = await this._planBusinessManager.getActive();
            let req: INameToValueMap = {
                metadata: {
                    'First Name': !data.firstName || data.firstName === '' ? data.email.substring(0, data.email.indexOf('@')) : data.firstName,
                    'Last Name': !data.lastName || data.lastName === '' ? data.email.substring(0, data.email.indexOf('@')) : data.lastName,
                    'Role': data.role,
                    'Contact Number': data.contactnumber ? data.contactnumber : 0,
                    'AuthKey': data.whizzimoId,
                    'TeacherKey': data.whizzimoId,
                    'Referral Code': data.code,
                    'Referral Code Description': data.codeDesc,
                    'coupon': null
                },
                plan: plans.find((plan: any) => plan.name === data.plan && (typeof plan._id) === 'string')._id,
                email: data.email,
            };
            if(data.codeDesc && data.codeDesc !== '') {
                try {
                    const coupon = await this.getPromo(data.codeDesc);

                    if(coupon.valid) {
                        req['coupon'] = data.codeDesc;
                    }

                    const customer = await this._paymentDataManager.createCustomer(req);

                    resolve(customer);
                } catch (error) {
                    reject(error);
                }

            } else {
                try {
                    const customer = await this._paymentDataManager.createCustomer(req);
                    resolve(customer);
                } catch (error) {
                    reject(error);
                }
            }
        });
    }

    createInvoice(customerId: string): Promise<any> {
        return this._paymentDataManager.createInvoice(customerId);
    }

    createSubscription(subscription: any): Promise<any> {
        return this._paymentDataManager.createSubscription(subscription);
    }

    deleteCard(customerId: string, cardId: string): Promise<any> {
        return this._paymentDataManager.deleteCard(customerId, cardId);
    }

    deleteCustomer(customerId: string): Promise<any> {
        return this._paymentDataManager.deleteCustomer(customerId);
    }

    getCards(customerId: string): Promise<any> {
        return this._paymentDataManager.getCards(customerId);
    }

    getCustomer(customerId: string): Promise<any> {
        return this._paymentDataManager.getCustomer(customerId);
    }

    getProduct(productId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let plans: any[] = [];
            this._paymentDataManager
                .getProduct(productId)
                .then((result: any) => {
                    plans = result.data;

                    return this._planBusinessManager.getActive();
                })
                .then((activePlans: any[]) => {
                    plans = plans.filter(plan => {
                       return activePlans.find(activePlan => activePlan._id === plan.id);
                    });

                    resolve(plans);
                })
                .catch((error: any) => reject(error));
        });
    }

    getPromo(promoCode: string): Promise<any> {
        return this._paymentDataManager.getPromo(promoCode);
    }

    deleteCustomerPromo(customerId: string): Promise<any> {
        return this._paymentDataManager.deleteCustomerPromo(customerId);
    }
    deleteSubscriptionPromo(subscriptionId: string): Promise<any> {
        return this._paymentDataManager.deleteSubscriptionPromo(subscriptionId);
    }
    getSubscription(subscriptionId: string): Promise<any> {
        return this._paymentDataManager.getSubscription(subscriptionId);
    }
    getAllSubscriptions(customerId: string): Promise<any> {
        return this._paymentDataManager.getAllSubscriptions(customerId);
    }
    getUpcomingInvoice(customerId: string): Promise<any> {
        return this._paymentDataManager.getUpcomingInvoice(customerId);
    }

    updateCustomer(customerId: string, updatedCustomerFields: any): Promise<any> {
        return this._paymentDataManager.updateCustomer(customerId, updatedCustomerFields);
    }

    updatePaymentSubscription(customerId: string, planId: string, promoId:string, isDowngrade: boolean, billingCycleAnchor : string, prorationBehavior: string, start_date: number): Promise<any> {
        let isNewSub:boolean =false;
        return new Promise((resolve, reject) => {
            this.getCustomer(customerId)
                .then(customer => {
                    let subObject: INameToValueMap = {
                        plan: planId,
                        trial_end: 'now',
                        coupon: null,
                    };
                    if(billingCycleAnchor){
                        subObject["billing_cycle_anchor"] = billingCycleAnchor;
                    }
                    if(!isDowngrade && prorationBehavior){
                        subObject["proration_behavior"] = prorationBehavior;
                    }
                    if(promoId && promoId !== '') {
                        subObject.coupon = promoId
                    }

                    if(customer.subscriptions.data.length > 0) {
                        if(isDowngrade){
                            //When downgrading you need to create the next subscription at the end of the current billing cycle.
                            subObject["customer"] = customerId;
                            return this._paymentDataManager.scheduleNewPlan(subObject, start_date);
                        }
                        else{
                        //This is an older version of Stripe that doesn't allow billing_cycle_anchor and trial_end in the same call.
                        //check to see if it's a trial:
                            if(customer.subscriptions.data[0].trial_start){
                                delete subObject["billing_cycle_anchor"];
                            }
                            else{
                                //If not, delete the trial_end property above.
                                delete subObject["trial_end"]
                            }
                            return this._paymentDataManager.updateSubscription(customer.subscriptions.data[0].id, subObject);
                        }

                    } else {
                        isNewSub = true;
                        //This is an older version of Stripe that doesn't allow billing_cycle_anchor and trial_end in the same call.
                        delete subObject.trial_end;
                        if(prorationBehavior){
                            delete subObject.prorate;
                        }
                        else{
                            subObject.prorate = !isDowngrade;
                        }
                        subObject.customer = customerId;
                        return this.createSubscription(subObject);
                    }
                })
                .then((result: any) => {
                    resolve(result);
                })
                .catch(err => reject(err));
        });
    }

    scheduleNewPlan(subscription: any, start_date: number): Promise<any>{
        return undefined;
    }

    updateSubscription(customerId: string, updatedSubsctiption: any): Promise<any> {
        return undefined;
    }

    validateCreditCard(creditCard: any): Promise<any> {
        return this._paymentDataManager.validateCreditCard(creditCard);
    }
}

export {PaymentBusinessManager};
