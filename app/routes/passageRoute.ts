import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {Errors} from "../constants/Errors";
import {PassageBusinessManager} from "../businessManagers/impl/PassageBusinessManager";
const router = (module.exports = require('express').Router());


// @ts-ignore
const passageBusinessManager = container.get<PassageBusinessManager>(TYPES.PassageBusinessManager);

router.get('/user/:userId', getMany);
router.get('/:passageId', get);
router.post('/', create);
router.put('/:passageId', update);
router.delete('/:passageId', remove);

function getMany (req:any, res:any) {
    passageBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    passageBusinessManager
        .get(req.params.passageId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    passageBusinessManager
        .protectedCreate(req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
    passageBusinessManager
        .protectedUpdate(req.params.passageId, req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
    passageBusinessManager
        .protectedDelete(req.params.passageId, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
