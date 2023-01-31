import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {WorkbookBusinessManager} from "../businessManagers/impl/WorkbookBusinessManager";
const router = (module.exports = require('express').Router());
const ObjectId = require('bson-objectid');

// @ts-ignore
const workbookBusinessManager = container.get<WorkbookBusinessManager>(TYPES.WorkbookBusinessManager);

router.get('/user/:userId', getWorkbooks);
router.get('/:workbookId', getWorkbook);
router.get('/ids/:ids', getWorkbooksByIds);
router.post('/', create);
router.post('/copy', copy);
router.put('/:workbookId', update);
router.delete('/:workbookId', remove);

function getWorkbooks(req:any, res:any) {
  if(req.params.userId.toLowerCase() === 'libraryuser') {
    return getLibraryWorkbooks(req, res);
  }

  workbookBusinessManager
    .getMany(req.params.userId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));
}

function getWorkbook(req:any, res:any) {
  workbookBusinessManager
    .get(req.params.workbookId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));
}

function getWorkbooksByIds(req: any, res: any) {
  const ids = req.params.ids.split(',');

  workbookBusinessManager
      .getManyById(ids)
      .then((result: any) => res.status(200).json({data: result}))
      .catch((error: any) => res.status(500).json({error: error}));

}

function getLibraryWorkbooks(req:any, res:any) {
  workbookBusinessManager
      .getWorkbookLibrary()
      .then((result: any) => res.status(200).json({data: result}))
      .catch((error: any) => res.status(500).json({error: error}));
}

function create(req:any, res:any) {
  workbookBusinessManager
    .protectedCreate(req.body, req.locals)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error.message}));
}

function copy(req:any, res:any) {
  workbookBusinessManager
      .copy(req.body.workbookId, req.body.ownerKey, req.body.changeName)
      .then((result: any) => res.status(200).json({data: result}))
      .catch((error: any) => res.status(500).json({error: error.message}));
}

function update(req:any, res:any) {
  workbookBusinessManager
    .update(req.params.workbookId, req.body)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));
}

function remove(req:any, res:any) {
  workbookBusinessManager
    .delete(req.params.workbookId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));
}


