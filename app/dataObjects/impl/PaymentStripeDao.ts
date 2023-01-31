import {injectable} from "inversify";
const stripe = require('stripe')(process.env.STRIPE_KEY);
import IPaymentBase from "../../shared/IPaymentBase";

@injectable()
class PaymentStripeDao implements IPaymentBase {
    cancelSubscription(subscriptionId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.subscriptions.del(subscriptionId, function(err: any, confirmation: any){
                if(err) return reject(err);

                resolve(confirmation);
            })
        })
    }

    cancelScheduledSubscription(scheduledSubscriptionId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.subscriptionSchedules.cancel(scheduledSubscriptionId, function(err: any, confirmation: any){
                if(err) return reject(err);

                resolve(confirmation);
            })
        })
    }

    cancelAtEndOfSubscription(subscriptionId: string, updatedSubscription: any): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.subscriptions.update(subscriptionId, updatedSubscription, (err: any, subscription: any) =>  {
                if(err) return reject(err);

                resolve(subscription);
            });
        });
    }

    createCard(customerId: string, source: any): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.customers.createSource(customerId, source, (err: any, card: any) => {
                if(err) return reject(err);

                resolve(card);
            })
        });
    }

    createCardToken(card: any): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.tokens.create({card: card}, (err: any, token: any) => {
                if(err) return reject(err);

                resolve(token);
            });
        });
    }

    createCustomer(newCustomer: any): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.customers.create(newCustomer, (err: any, customer: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(customer.id);
            });
        });
    }

    createInvoice(customerId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.invoices.create({customer: customerId}, (err: any, invoice: any) => {
                if(err) return reject(err);

                resolve(invoice);
            });
        });
    }

    deleteCard(customerId: string, cardId: string): Promise<any> {
        return new Promise(((resolve, reject) => {
            stripe.customers.deleteSource(customerId, cardId, (err: any, confirmation: any) => {
                if(err) reject(err);

                resolve(confirmation);
            });
        }));
    }

    deleteCustomer(customerId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.customers.del(customerId, function(err: any, confirmation: any) {
                if(err) return reject(err);

                resolve(confirmation);
            });
        });
    }
    getCards(customerId: string): Promise<any> {
            return new Promise((resolve, reject) => {
            stripe.customers.listSources(customerId, (err: any, cards: any) => {
                if(err) return reject(err);

                resolve(cards)
            })
        });
    }

    getCustomer(customerId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.customers.retrieve(customerId, (err: any, customer: any) => {
                if(err) {
                    console.log(err);
                    return reject(err);
                }

                resolve(customer);
            });
        });
    }

    getProduct(): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.plans.list(function(err: any, product: any) {
                if(err) return reject(err);

                resolve(product);
            });
        });
    }

    getPromo(promoCode: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.coupons.retrieve(promoCode, (err: any, coupon: any) => {
                if(err) {
                    return reject(err);
                }

                resolve(coupon);
            });
        });
    }

    deleteCustomerPromo(customerId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.customers.deleteDiscount(customerId, (err: any, confirmation: any) => {
                if(err) {
                    return reject(err);
                }
                resolve(confirmation);
            });
        });
    }

    deleteSubscriptionPromo(subscriptionId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.subscriptions.deleteDiscount(subscriptionId, (err: any, confirmation: any) => {
                if(err) {
                    return reject(err);
                }
                resolve(confirmation);
            });
        });
    }

    getSubscription(subscriptionId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.subscriptions.retrieve(subscriptionId, (err: any, subscription: any) => {
                if(err) return reject(err);

                resolve(subscription);
            });
        });
    }

    getAllSubscriptions(customerId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.subscriptionSchedules.list({customer: customerId}, (err: any, subscriptions: any) => {
                if(err) {
                    return reject(err);
                }
                else{
                    resolve(subscriptions);
                }
            });
        });
    }

    getUpcomingInvoice(customerId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.invoices.retrieveUpcoming(customerId, (err: any, upcoming: any) => {
                if(err && err.code != 'invoice_upcoming_none') return reject(err);

                resolve(upcoming);
            });
        });
    }

    updateCustomer(customerId: string, updatedCustomerFields: any): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.customers.update(customerId, updatedCustomerFields, (err: any, customer: any) => {
                if(err) return reject(err);

                resolve(customer)
            });
        });
    }

    updateSubscription(subscriptionId: string, updatedSubscription: any): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.subscriptions.update(subscriptionId, updatedSubscription, (err: any, subscription: any) =>  {
                if(err) return reject(err);

                resolve(subscription);
            });
        });
    }

    createSubscription(subscription: any): Promise<any> {
        return new Promise((resolve, reject) => {
            stripe.subscriptions.create(subscription, (err: any, subscription: any) => {
                if(err) return reject(err);

                resolve(subscription);
            });
        });
    }

    scheduleNewPlan(subscription: any, start_date: number): Promise<any> {
        const sub = {
            customer: subscription.customer,
            start_date: start_date,
            phases:
                [
                    {
                    items: [
                        {
                        plan: subscription.plan,
                        quantity: 1,
                        },
                    ],
                    iterations: 12,
                    },
                ],
            }
        return new Promise((resolve, reject) => {
            stripe.subscriptionSchedules.create(sub, (err: any, subscription: any) => {
                if(err) return reject(err);

                resolve(subscription);
            });
        });
    }

    validateCreditCard(creditCard: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const isNumberValid = stripe.card.validateCardNumber(creditCard.number);
            const isCvcValid = stripe.card.validateCVC(creditCard.cvc);
            const isExpiryValid = stripe.card.validateCardNumber(creditCard.month, creditCard.year);

            let errors: any = {};
            if (!isNumberValid) {
                errors.invalidNumber = true;
            }

            if (!isCvcValid) {
                errors.invalidCvc = true;
            }

            if (!isExpiryValid) {
                errors.invalidExpiry = true;
            }

            if(Object.keys(errors).length > 0) {
                return reject(errors);
            }

            resolve({number: isNumberValid, cvc: isCvcValid, expiry: isExpiryValid});
        });
    }
}

export {PaymentStripeDao};
