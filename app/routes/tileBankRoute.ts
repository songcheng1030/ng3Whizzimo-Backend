const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
const ObjectId = require('bson-objectid');
import {TileBankBusinessManager} from "../businessManagers/impl/TileBankBusinessManager";

// @ts-ignore
let tileBankBusinessManager = container.get<TileBankBusinessManager>(TYPES.TileBankDataManager);

router.get('/:tileBankId', get)
router.get('/user/:userId', getByUserId);
router.put('/:tileBankId', update);

function get (req:any, res:any) {
    tileBankBusinessManager.get(req.params.tileBankId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getByUserId (req:any, res:any) {
    const userId = ObjectId.isValid(req.params.userId) ? ObjectId(req.params.userId) : req.params.userId;

    tileBankBusinessManager.getByUserId(userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
    const tileBankId = ObjectId.isValid(req.params.tileBankId) ? ObjectId(req.params.tileBankId) : req.params.tileBankId;

    tileBankBusinessManager.update(tileBankId, req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
