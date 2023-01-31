import {SubscriptionBusinessManager} from "../businessManagers/impl/SubscriptionBusinessManager";

const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";


// @ts-ignore
const subscriptionBusinessManager = container.get<SubscriptionBusinessManager>(TYPES.SubscriptionBusinessManager);

router.get('/:subscriptionId', get);
router.get('/user/:userId', getMany);
router.post('/', create);
router.post('/multiple', createMany);
router.delete('/:subscriptionId', remove);

function get (req:any, res:any) {
    subscriptionBusinessManager
        .get(req.params.sentenceId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getMany (req:any, res:any) {
    subscriptionBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    subscriptionBusinessManager
        .protectedCreate(req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function createMany (req:any, res:any) {
    subscriptionBusinessManager
        .protectedCreateMany(req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
    subscriptionBusinessManager
        .protectedDelete(req.params.subscriptionId, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
