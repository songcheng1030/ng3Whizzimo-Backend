import {Errors} from "../constants/Errors";
const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {BundleBusinessManager} from "../businessManagers/impl/BundleBusinessManager";

// @ts-ignore
const bundleBusinessManager = container.get<BundleBusinessManager>(TYPES.BundleBusinessManager);

router.get('/user/:userId', getMany);
router.get('/:bundleId', get);
router.post('/apply', apply);
router.post('/', create);
router.post('/multiple', createMany);
router.put('/:bundleId', update);
router.delete('/:bundleId', remove);

function getMany(req:any, res:any) {
    if(!req.locals.admin) {
        if(req.params.userId !== req.locals.userId) {
            return res.status(403).json({error: Errors.notAuthorized});
        }
    }

    bundleBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get(req:any, res:any) {
    bundleBusinessManager
        .get(req.params.bundleId)
        .then((result: any) => {
            if(!req.locals.admin && result.ownerKey !== req.locals.userId) {
                return res.status(403).json({error: Errors.notAuthorized});
            }

            return res.status(200).json({data: result})
        })
        .catch((error: any) => res.status(500).json({error: error}));
}

function create(req:any, res:any) {
    if(!req.locals.admin) {
        if(req.body.ownerKey !== req.locals.userId) {
            return res.status(403).json({error: Errors.notAuthorized});
        }
    }

    bundleBusinessManager
        .create(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function createMany(req:any, res:any) {
    if(!req.locals.admin) {
        if(req.body.filter((dt:any)=>dt.ownerKey !== req.locals.userId).length > 0 ) {
            return res.status(403).json({error: Errors.notAuthorized});
        }
    }

    bundleBusinessManager
        .createMany(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function apply(req:any, res:any) {
    bundleBusinessManager
        .apply(req.body.code, req.locals.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => {
            if (error?.indexOf && error.indexOf("Bundle") >= 0) {
                res.status(404).json({error: error});
            } else {
                res.status(500).json({error: error});
            }
        });
}

function update(req:any, res:any) {
    bundleBusinessManager.protectedUpdate(req.params.bundleId, req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}


function remove(req:any, res:any) {
    bundleBusinessManager.protectedDelete(req.params.bundleId, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
