import {SentenceBusinessManager} from "../businessManagers/impl/SentenceBusinessManager";

const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {Errors} from "../constants/Errors";

// @ts-ignore
const sentenceBusinessManager = container.get<SentenceBusinessManager>(TYPES.SentenceBusinessManager);

router.get('/user/:userId', getMany);
router.get('/:sentenceId', get);
router.post('/', create);
router.put('/:sentenceId', update);
router.delete('/:sentenceId', remove);

function getMany (req:any, res:any) {
    sentenceBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    sentenceBusinessManager
        .get(req.params.sentenceId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    if(!req.locals.admin && req.locals.userId !== req.body.ownerKey) {
        return res.status(404).json({error: Errors.notAuthorized});
    }

    sentenceBusinessManager
        .create(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
    sentenceBusinessManager
        .protectedUpdate(req.params.sentenceId, req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
    sentenceBusinessManager
        .protectedDelete(req.params.sentenceId, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
