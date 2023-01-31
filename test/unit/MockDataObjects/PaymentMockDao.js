"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMockDao = void 0;
const inversify_1 = require("inversify");
let PaymentMockDao = class PaymentMockDao {
    constructor() {
        this.db = [
            {
                id: "1",
                account_balance: 0,
                address: "444 Test St.",
                name: "John Test"
            }
        ];
        this.promodb = [
            {
                code: '100 percent',
                valid: true
            }
        ];
    }
    cancelSubscription(subscriptionId) {
        return undefined;
    }
    cancelScheduledSubscription(scheduledSubscriptionId) {
        return undefined;
    }
    cancelAtEndOfSubscription(subscriptionId, updatedSubscription) {
        return undefined;
    }
    createCard(customerId, source) {
        return undefined;
    }
    createCardToken(card) {
        return undefined;
    }
    createCustomer(data) {
        return new Promise((resolve) => {
            data.id = Date.now().toString();
            this.promodb.push(data);
            resolve(data);
        });
    }
    createInvoice(customerId) {
        return undefined;
    }
    createSubscription(subscription) {
        return undefined;
    }
    scheduleNewPlan(subscription, start_date) {
        return undefined;
    }
    deleteCard(customerId, cardId) {
        return undefined;
    }
    deleteCustomer(customerId) {
        return undefined;
    }
    getCards(customerId) {
        return undefined;
    }
    getCustomer(customerId) {
        return undefined;
    }
    getProduct(productId) {
        return undefined;
    }
    getPromo(promoCode) {
        return new Promise((resolve, reject) => {
            let promo = this.promodb.find(promo => promo.code === promoCode);
            if (!promo) {
                promo = { valid: false };
            }
            resolve(promo);
        });
    }
    deleteCustomerPromo(customerId) {
        return undefined;
    }
    deleteSubscriptionPromo(subscriptionId) {
        return undefined;
    }
    getSubscription(subscriptionId) {
        return undefined;
    }
    getAllSubscriptions(customerId) {
        return undefined;
    }
    getUpcomingInvoice(customerId) {
        return undefined;
    }
    updateCustomer(customerId, updatedCustomerFields) {
        return undefined;
    }
    updateSubscription(customerId, updatedSubsctiption) {
        return undefined;
    }
    validateCreditCard(creditCard) {
        return undefined;
    }
};
PaymentMockDao = __decorate([
    inversify_1.injectable()
], PaymentMockDao);
exports.PaymentMockDao = PaymentMockDao;
//# sourceMappingURL=PaymentMockDao.js.map