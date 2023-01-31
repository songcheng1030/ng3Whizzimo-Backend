import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {WorkbookPhraseBusinessManager} from "../businessManagers/impl/WorkbookPhraseBusinessManager";
const router = (module.exports = require('express').Router());
const ObjectId = require('bson-objectid');

// @ts-ignore
const workbookPhraseBusinessManager = container.get<WorkbookPhraseBusinessManager>(TYPES.WorkbookPhraseBusinessManager);

router.get('/workbook/:workbookId', getMany);
router.get('/:workbookPhraseId', get);
router.post('/', create);
router.delete('/:workbookPhraseId', remove);
router.delete('/phrase/:phraseId', removeMany);
router.put('/:workbookPhraseId', update)
router.delete('/:collectionId/:itemId', modify)

function getMany (req:any, res:any) {
    const workbookId = ObjectId.isValid(req.params.workbookId) ? ObjectId(req.params.workbookId) : req.params.workbookId;
    workbookPhraseBusinessManager
        .getMany(workbookId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    workbookPhraseBusinessManager
        .get(req.params.workbookPhraseId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    workbookPhraseBusinessManager
        .create(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => { res.status(500).json({error: error.message})
        });
}

function remove (req:any, res:any) {
    workbookPhraseBusinessManager
        .delete(req.params.workbookPhraseId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
function modify(req: any, res: any){
    workbookPhraseBusinessManager.
    modify(req.params.collectionId, req.params.itemId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));

}

function removeMany (req:any, res:any) {
    workbookPhraseBusinessManager
        .deleteMany(req.params.phraseId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
    workbookPhraseBusinessManager
        .update(req.params.workbookPhraseId, req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
