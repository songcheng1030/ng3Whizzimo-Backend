import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {WorkbookSentenceBusinessManager} from "../businessManagers/impl/WorkbookSentenceBusinessManager";
const router = (module.exports = require('express').Router());
const ObjectId = require('bson-objectid');

// @ts-ignore
const workbookSentenceBusinessManager = container.get<WorkbookSentenceBusinessManager>(TYPES.WorkbookSentenceBusinessManager);

router.get('/workbook/:workbookId', getMany);
router.get('/:workbookSentenceId', get);
router.post('/', create);
router.delete('/:workbookSentenceId', remove);
router.delete('/sentence/:sentenceId', removeMany);
router.put('/:workbookSentenceId', update)
router.delete('/:collectionId/:itemId', modify)


function getMany (req:any, res:any) {
    const workbookId = ObjectId.isValid(req.params.workbookId) ? ObjectId(req.params.workbookId) : req.params.workbookId;

    workbookSentenceBusinessManager
        .getMany(workbookId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    workbookSentenceBusinessManager
        .get(req.params.workbookSentenceId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    workbookSentenceBusinessManager
        .create(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
    workbookSentenceBusinessManager
        .delete(req.params.workbookSentenceId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
function modify(req: any, res: any){
    workbookSentenceBusinessManager.
    modify(req.params.collectionId, req.params.itemId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));

}

function removeMany (req:any, res:any) {
    workbookSentenceBusinessManager
        .deleteMany(req.params.sentenceId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
    workbookSentenceBusinessManager
        .update(req.params.workbookSentenceId, req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
