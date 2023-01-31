import {PhraseBusinessManager} from "../businessManagers/impl/PhraseBusinessManager";
const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
const {errorText} = require('./../utility');

// @ts-ignore
const phraseBusinessManager = container.get<PhraseBusinessManager>(TYPES.PhraseBusinessManager);

router.get('/user/:userId', getMany);
router.get('/:phraseId', get);
router.post('/', create);
router.put('/:phraseId', update);
router.delete('/:phraseId', remove);

function getMany (req:any, res:any) {
    phraseBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    phraseBusinessManager
        .get(req.params.phraseId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    if(!req.locals.admin && req.locals.userId !== req.body.ownerKey) {
        return res.status(404).json({error: errorText.notAuthorized});
    }

    phraseBusinessManager
        .protectedCreate(req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
    phraseBusinessManager
        .protectedUpdate(req.params.phraseId, req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
    phraseBusinessManager
        .protectedDelete(req.params.phraseId, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
