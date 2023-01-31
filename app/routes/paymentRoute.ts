import {PaymentBusinessManager} from "../businessManagers/impl/PaymentBusinessManager";

const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";

// @ts-ignore
const paymentBusinessManager = container.get<PaymentBusinessManager>(TYPES.PaymentBusinessManager);

router.get('/customer/:customerId', getCustomer)

function getCustomer(req: any, res: any) {
    paymentBusinessManager
        .getCustomer(req.params.customerId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
