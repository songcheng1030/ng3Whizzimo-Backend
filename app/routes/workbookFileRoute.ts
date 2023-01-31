import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {WorkbookFileBusinessManager} from "../businessManagers/impl/WorkbookFileBusinessManager";
const router = (module.exports = require('express').Router());
const ObjectId = require('bson-objectid');

// @ts-ignore
const workbookFileBusinessManager = container.get<WorkbookFileBusinessManager>(TYPES.WorkbookFileBusinessManager);

router.get('/workbook/:workbookId', getMany);
router.get('/:workbookFileId', get);
router.post('/', create);
router.post('/multi', createMany);
router.delete('/:workbookFileId', remove);
router.put('/:workbookFileId', update);
router.delete('/:collectionId/:itemId', modify)

function getMany (req:any, res:any) {
    const workbookId = ObjectId.isValid(req.params.workbookId) ? ObjectId(req.params.workbookId) : req.params.workbookId;
    workbookFileBusinessManager
        .getMany(workbookId)
        .then((result: any) => {
            res.status(200).json({data: result})
        })
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    workbookFileBusinessManager
        .get(req.params.workbookFileId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    workbookFileBusinessManager
        .create(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error.message}));
}

function createMany (req:any, res:any) {
    workbookFileBusinessManager
        .createMany(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error.message}));
}

function remove (req:any, res:any) {
    workbookFileBusinessManager
        .delete(req.params.workbookFileId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
function modify(req: any, res: any){
    workbookFileBusinessManager.
    modify(req.params.collectionId, req.params.itemId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));

}

function update (req:any, res:any) {
    workbookFileBusinessManager
        .update(req.params.workbookFileId, req.body)
        .then((result: any) => {
            res.status(200).json({data: result})
        })
        .catch((error: any) => {
            res.status(500).json({error: error})
        });
}
