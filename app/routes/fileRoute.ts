import {FileBusinessManager} from "../businessManagers/impl/FileBusinessManager";
const router = (module.exports = require('express').Router());
    import container from "./../../inversify.base.config";
    import TYPES from "../../types";
const ObjectId = require('bson-objectid');
const multer = require('multer');

var upload = multer({ dest: 'uploads/' });
// @ts-ignore
const fileBusinessManager = container.get<FileBusinessManager>(TYPES.FileBusinessManager);

router.get('/user/:userId', getMany);
router.get('/:fileId', get);
router.post('/', upload.single('file'), create);
router.post('/multi', upload.array('file', 12), createMany);
router.delete('/:fileId', remove);
router.put('/rename/:fileId/:fileName', rename)

function getMany (req:any, res:any) {
    fileBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error:any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    fileBusinessManager
        .get(req.params.fileId)
        .then((result: any) => {
            res.status(200).json({data: result})
        })
        .catch((error:any) => {
            res.status(500).json({error: error})
        });
}

function create (req:any, res:any) {
    fileBusinessManager
        .protectedCreate(req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => {
            console.log(error);
            res.status(500).json({error: error})
        });
}

function createMany(req: any, res: any) {
    fileBusinessManager
        .createMany(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => {
            console.log(error);
            res.status(500).json({error: error})
        });
}

function remove (req:any, res:any) {
    const id = ObjectId.isValid(req.params.fileId) ? ObjectId(req.params.fileId) : req.params.fileId;
    fileBusinessManager
        .protectedDelete(id, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error:any) => res.status(500).json({error: error}));
}


function rename(req:any, res:any) {
    fileBusinessManager.update(req.params.fileId, {name: req.params.fileName})
        .then((result: any) => {
            return res.status(200).json({data: result})
        })
        .catch((error:any) => {
            res.status(500).json({error: error})
        });
}
