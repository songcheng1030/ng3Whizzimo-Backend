import {LessonPlanStepBusinessManager} from "../businessManagers/impl/LessonPlanStepBusinessManager";
const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
const ObjectId = require('bson-objectid');

// @ts-ignore
const lessonPlanStepBusinessManager = container.get<LessonPlanStepBusinessManager>(TYPES.LessonPlanStepBusinessManager);

router.get('/lessonPlan/:lessonPlanId', getMany);
router.get('/:lessonPlanStepId', get);
router.get('/count/courseWorkbook/:courseWorkbookId', getCountByCourseWorkbookId);
router.get('/count/workbook/:workbookId', getCountByWorkbookId);
router.post('/', create);
// router.post('/copy/:lessonPlanStepId', copy);
router.put('/:lessonPlanStepId', update);
router.put('/update/multi', updateMany);
router.delete('/:lessonPlanStepId', remove);

function getMany (req:any, res:any) {
    lessonPlanStepBusinessManager
        .getMany(req.params.lessonPlanId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    lessonPlanStepBusinessManager
        .get(req.params.lessonPlanStepId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    lessonPlanStepBusinessManager.protectedCreate(req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error.message}));
}

function update (req:any, res:any) {
    lessonPlanStepBusinessManager
        .protectedUpdate(req.params.lessonPlanStepId, req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function updateMany(req: any, res: any) {
    lessonPlanStepBusinessManager.updateMany(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
    lessonPlanStepBusinessManager
        .protectedDelete(req.params.lessonPlanStepId, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

// function copy (req: any, res: any) {
//     lessonPlanStepBusinessManager
//         .copy(req.params.lessonPlanStepId, null, req.body, true)
//         .then((result: any) => res.status(200).json({data: result}))
//         .catch((error: any) => res.status(500).json({error: error}));
// }

function getCountByWorkbookId(req: any, res: any) {
    lessonPlanStepBusinessManager
        .getCountByWorkbookId(req.params.workbookId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));

}

function getCountByCourseWorkbookId(req: any, res: any) {
    lessonPlanStepBusinessManager
        .getCountByWorkbookId(req.params.courseWorkbookId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
