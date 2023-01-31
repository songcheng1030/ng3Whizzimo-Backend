import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {WorkbookPassageBusinessManager} from "../businessManagers/impl/WorkbookPassageBusinessManager";
const router = (module.exports = require('express').Router());
const ObjectId = require('bson-objectid');

// @ts-ignore
const workbookPassageBusinessManager = container.get<WorkbookPassageBusinessManager>(TYPES.WorkbookPassageBusinessManager);

router.get('/workbook/:workbookId', getMany);
router.get('/:workbookPassageId', get);
router.post('/', create);
router.delete('/:workbookPassageId', remove);
router.delete('/passage/:passageId', removeMany);
router.put('/:workbookPassageId', update);
router.delete('/:collectionId/:itemId', modify)
function getMany (req:any, res:any) {
    const workbookId = ObjectId.isValid(req.params.workbookId) ? ObjectId(req.params.workbookId) : req.params.workbookId;
    workbookPassageBusinessManager
        .getMany(workbookId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    workbookPassageBusinessManager
        .get(req.params.workbookPassageId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    workbookPassageBusinessManager
        .create(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
    workbookPassageBusinessManager
        .delete(req.params.workbookPassageId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function modify(req: any, res: any){
    workbookPassageBusinessManager.
    modify(req.params.collectionId, req.params.itemId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));

}

function removeMany (req:any, res:any) {
    workbookPassageBusinessManager
        .deleteMany(req.params.passageId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
    workbookPassageBusinessManager
        .update(req.params.workbookPassageId, req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
