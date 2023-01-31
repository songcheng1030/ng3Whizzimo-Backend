import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {WordBusinessManager} from "../businessManagers/impl/WordBusinessManager";
import {SoundLetterPairingsBusinessManager} from "../businessManagers/impl/SoundLetterPairingsBusinessManager";
const router = (module.exports = require('express').Router());

// @ts-ignore
const wordBusinessManager = container.get<WordBusinessManager>(TYPES.WordBusinessManager);
// @ts-ignore
const soundLetterPairingsBusinessManager = container.get<SoundLetterPairingsBusinessManager>(TYPES.SoundLetterPairingsBusinessManager);

router.post('/customer/:customerId', getWords);
router.post('/wordIds', getWordsByIds);
router.post('/tiles/wordIds/:userId', getTilesByWordId);
router.get('/sound-letter-pairings', getSoundLetterPairings);

function getSoundLetterPairings(req: any, res: any) {
    soundLetterPairingsBusinessManager
        .getSoundLetterPairings()
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getWordsByIds(req: any, res: any) {
    wordBusinessManager
        .getWordsByIds(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getWords(req:any, res:any) {
        wordBusinessManager
        .getUsingCustomerId(req.body, req.params.customerId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getTilesByWordId(req: any, res: any) {
    wordBusinessManager
        .getTilesByWordIds(req.params.userId, req.body, false)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
