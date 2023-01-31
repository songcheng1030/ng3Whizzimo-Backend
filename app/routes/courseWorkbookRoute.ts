const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {CourseWorkbookBusinessManager} from "../businessManagers/impl/CourseWorkbookBusinessManager";
const ObjectId = require('bson-objectid');

// @ts-ignore
const courseWorkbookBusinessManager = container.get<CourseWorkbookBusinessManager>(TYPES.CourseWorkbookBusinessManager);

router.get('/course/:courseId', getMany);
router.get('/:courseWorkbookId', get);
router.get('/count/workbook/:workbookId', getCountByWorkbookId);
router.post('/', create);
router.post('/copy/:courseWorkbookId', copy);
router.put('/:courseWorkbookId', update);
router.put('/:id/:workbookId', updateByWorkbook);

router.delete('/:courseWorkbookId', remove);
router.delete('/:workbookId/:courseId', removeFromCourseWorkbookByWorkbookId);

function getMany (req:any, res:any) {
    const courseId = ObjectId.isValid(req.params.courseId) ? ObjectId(req.params.courseId) : req.params.courseId;
    console.log('1')
    courseWorkbookBusinessManager.getMany(courseId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    courseWorkbookBusinessManager.get(req.params.courseWorkbookId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    courseWorkbookBusinessManager.protectedCreate(req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error.message}));
}

function update (req:any, res:any) {
    courseWorkbookBusinessManager.protectedUpdate(req.params.courseWorkbookId, req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
function updateByWorkbook (req:any, res:any) {
    courseWorkbookBusinessManager.updateByWorkbook(req.params.id, req.params.workbookId, req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
    courseWorkbookBusinessManager.protectedDelete(req.params.courseWorkbookId, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function copy (req:any, res:any) {
    courseWorkbookBusinessManager.copy(req.params.courseWorkbookId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function removeFromCourseWorkbookByWorkbookId(req: any, res: any) {
    courseWorkbookBusinessManager.deleteFromCourseWorkbookByWorkbookId(req.params.workbookId, req.params.courseId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getCountByWorkbookId(req: any, res: any) {
    courseWorkbookBusinessManager
        .getCountByWorkbookId(req.params.workbookId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
