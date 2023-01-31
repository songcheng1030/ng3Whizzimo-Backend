import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {BundleQueueBusinessManager} from "../businessManagers/impl/BundleQueueBusinessManager";
import {Errors} from "../constants/Errors";
const router = (module.exports = require('express').Router());

// @ts-ignore
const bundleQueueBusinessManager = container.get<BundleQueueBusinessManager>(TYPES.BundleQueueBusinessManager);

const getMany = (req:any, res:any) => {
    if(!req.locals.admin) {
        if(req.params.userId !== req.locals.userId) {
            return res.status(403).json({error: Errors.notAuthorized});
        }
    }

    bundleQueueBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
};

const create = (req:any, res:any) => {
    if(!req.locals.admin) {
        if(req.body.ownerKey !== req.locals.userId) {
            return res.status(403).json({error: Errors.notAuthorized});
        }
    }

    bundleQueueBusinessManager
        .create(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
};

const send = (req:any, res:any) => {
    bundleQueueBusinessManager
        .send(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
};

const remove = (req:any, res:any) => {
    bundleQueueBusinessManager
        .delete(req.params.bundleQueueId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
};

router.get('/user/:userId', getMany);
router.post('/', create);
router.post('/send', send);
router.delete('/:bundleQueueId', remove);
