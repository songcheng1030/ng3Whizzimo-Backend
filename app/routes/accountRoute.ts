import {SecurityBusinessManager} from "../businessManagers/impl/SecurityBusinessManager";
const router = (module.exports = require('express').Router());
import  container from "./../../inversify.base.config";
import TYPES from "../../types";
import {PaymentBusinessManager} from "../businessManagers/impl/PaymentBusinessManager";
import {Errors} from "../constants/Errors";
import {products} from "stripe";

// @ts-ignore
const securityBusinessManager = container.get<SecurityBusinessManager>(TYPES.SecurityBusinessManager);
// @ts-ignore
const paymentBusinessManager = container.get<PaymentBusinessManager>(TYPES.PaymentBusinessManager);

router.get('/customer/:customerId', getCustomer);
router.get('/customer/subscription/:customerId', getAllSubscriptions);
router.put('/customer/:customerId', updateCustomer);
router.delete('/customer/:customerId', deleteCustomer);
router.post('/card/:customerId', createCard);
router.delete('/card/:customerId/:cardId', deleteCard);
router.get('/promo/:promoId', getPromo);
router.delete('/promo/:customerId', deleteCustomerPromo);
router.delete('/promo/:subscriptionId', deleteSubscriptionPromo);
router.put('/subscription/:subscriptionId', cancelAtEndOfSubscription);
router.put('/subscription/customer/:customerId', updateSubscription);
router.delete('/subscription/:subscriptionId', cancelSubscription);
router.delete('/subscription/scheduled/:scheduledSubscriptionId', cancelScheduledSubscription);
router.get('/auth0/user/:userId', getAuth0User);
router.get('/auth0/user/clever/:emailAddress', getUserIsClever)
router.get('/products', getProducts);
router.post('/auth0/user/resetPassword/:emailAddress', resetPassword);

function getAuth0User(req:any, res:any) {
    if(!req.locals.admin && req.params.userId !== req.locals.auth0Id) {
        return res.status(403).json({error: Errors.notAuthorized});
    }
    securityBusinessManager
        .getUser(req.params.userId)
        .then((result: any) => {
            console.log(result.data)
            res.status(200).json({data: result.data})
        })
        .catch((err: any) =>{
            console.log(err.message);
            res.status(500).json({error: err.message});
        });
}

function getUserIsClever(req: any, res:any) {
    securityBusinessManager
        .getUserByEmailAddress(req.params.emailAddress)
        .then((result: any) => {
            const isClever = result.app_metadata && result.app_metadata.clever;
            res.status(200).json({data: isClever === 'true'})
        })
        .catch((err: any) =>{
            res.status(500).json({error: err.message});
        }) ;
}

function getCustomer(req:any, res:any) {
    let customer:any = {};
    paymentBusinessManager
        .getCustomer(req.params.customerId)
        .then((result: any) => {
            if(!req.locals.admin && result.metadata.AuthKey !== req.locals.userId) {
                throw new Error(Errors.notAuthorized);
            }

            customer = result;
            return paymentBusinessManager.getUpcomingInvoice(req.params.customerId)
        })
        .then((result: any) => {
            customer.nextInvoice = result;

            return paymentBusinessManager.getCards(req.params.customerId)
        })
        .then((result: any) => {
            customer.cards = result;

            res.status(200).json({data: customer})
        })
        .catch((err: any) => {
            res.status(err === Errors.notAuthorized ? 403 : 500).json({error: err})
        });
}

function getAllSubscriptions(req: any, res:any){
    paymentBusinessManager
        .getAllSubscriptions(req.params.customerId)
        .then((result: any) => {
            return paymentBusinessManager.getAllSubscriptions(req.params.customerId)
        })
        .then((result: any) => {
            res.status(200).json({data: result})
        })
        .catch((err: any) => res.status(err === Errors.notAuthorized ? 403 : 500).json({error: err}));
}

function updateCustomer(req:any, res:any) {
    paymentBusinessManager
        .getCustomer(req.params.customerId)
        .then((customer: any) => {
            if(!req.locals.admin && customer.metadata.AuthKey !== req.locals.userId) {
                throw new Error(Errors.notAuthorized);
            }

            return paymentBusinessManager.updateCustomer(req.params.customerId, req.body);
        })
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}));
}

function deleteCustomer(req:any, res:any) {
    paymentBusinessManager
        .deleteCustomer(req.params.customerId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}))
}

function createCard(req:any, res:any) {
    paymentBusinessManager.createCard(req.params.customerId, req.body.token)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}));
}

function deleteCard(req:any, res:any) {
    paymentBusinessManager
        .getCustomer(req.params.customerId)
        .then((customer: any) => {
            if(!req.locals.admin && customer.metadata.AuthKey !== req.locals.userId) {
                throw new Error(Errors.notAuthorized);
            }
            return paymentBusinessManager.deleteCard(req.params.customerId, req.params.cardId)
        })
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}));
}

function updateSubscription(req:any, res:any) {
    paymentBusinessManager
        .getCustomer(req.params.customerId)
        .then((customer: any) => {
            if(!req.locals.admin && customer.metadata.AuthKey !== req.locals.userId) {
                throw new Error(Errors.notAuthorized);
            }
            return paymentBusinessManager.updatePaymentSubscription(req.params.customerId, req.body.planId, req.body.promoId, req.body.isDowngrade, req.body.billing_cycle_anchor, req.body.proration_behavior, req.body.start_date);
        })
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}));
}

function cancelSubscription(req:any, res:any) {
    paymentBusinessManager
        .getSubscription(req.params.subscriptionId)
        .then((subscription: any) => paymentBusinessManager.getCustomer(subscription.customer))
        .then((customer: any) => {
            if(!req.locals.admin && customer.metadata.AuthKey !== req.locals.userId) {
                throw new Error(Errors.notAuthorized);
            }

                return paymentBusinessManager.cancelSubscription(req.params.subscriptionId);
        })
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}))
}

function cancelScheduledSubscription(req:any, res:any) {
    paymentBusinessManager
        .cancelScheduledSubscription(req.params.scheduledSubscriptionId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}))
}

function cancelAtEndOfSubscription(req:any, res:any) {
    paymentBusinessManager
        .getSubscription(req.params.subscriptionId)
        .then((subscription: any) => paymentBusinessManager.getCustomer(subscription.customer))
        .then((customer: any) => {
            if(!req.locals.admin && customer.metadata.AuthKey !== req.locals.userId) {
                throw new Error(Errors.notAuthorized);
            }
                return paymentBusinessManager.cancelAtEndOfSubscription(req.params.subscriptionId, req.body);
        })
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}))
}

function getPromo(req:any, res:any) {
    paymentBusinessManager.getPromo(req.params.promoId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}))
}

function deleteCustomerPromo(req:any, res:any) {
    paymentBusinessManager.deleteCustomerPromo(req.params.customerId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}))
}
function deleteSubscriptionPromo(req:any, res:any) {
    paymentBusinessManager.deleteSubscriptionPromo(req.params.subscriptionId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}))
}

function getProducts(req:any, res:any) {
    paymentBusinessManager.getProduct('1')
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}))
}

function resetPassword(req: any, res:any) {
    securityBusinessManager.resetPassword(req.params.emailAddress)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((err: any) => res.status(500).json({error: err}));
}
