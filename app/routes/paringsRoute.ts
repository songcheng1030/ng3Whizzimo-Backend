import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {PairingsBusinessManager} from "../businessManagers/impl/PairingsBusinessManager";
import IPairingsBusinessManager from "../businessManagers/IPairingsBusinessManager";
const router = (module.exports = require('express').Router());


// @ts-ignore
const pairingsBusinessManager:IPairingsBusinessManager = container.get<PairingsBusinessManager>(TYPES.PairingsBusinessManager);

router.get('/', getMany);
router.post('/compoundSounds', getPairingsFromCompoundSounds);

function getMany(req:any, res:any) {
    pairingsBusinessManager
        .getAllPairings()
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getPairingsFromCompoundSounds(req:any, res:any) {
    pairingsBusinessManager
        .getPairingsFromCompoundSounds(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}


