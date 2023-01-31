import {LessonPlanBusinessManager} from "../businessManagers/impl/LessonPlanBusinessManager";
const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
const ObjectId = require('bson-objectid');

// @ts-ignore
const lessonPlanBusinessManager = container.get<LessonPlanBusinessManager>(TYPES.LessonPlanBusinessManager);

router.get('/course/:courseId', getMany);
router.get('/course/steps/:courseId', getManyWithSteps);
router.get('/:lessonPlanId', get);
router.get('/firstStep/:lessonPlanId', getFirstLessonPlanStep   );
router.post('/', create);
router.post('/copy/:lessonPlanId', copy);
router.put('/:lessonPlanId', update);
router.delete('/:lessonPlanId', remove);

function getMany (req:any, res:any) {
    lessonPlanBusinessManager
        .getMany(req.params.courseId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getFirstLessonPlanStep(req: any, res: any) {
    lessonPlanBusinessManager
        .getFirstLessonPlanStep(req.params.lessonPlanId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getManyWithSteps(req:any, res:any) {
    lessonPlanBusinessManager
        .getManyWithSteps(req.params.courseId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req:any, res:any) {
    lessonPlanBusinessManager
        .get(req.params.lessonPlanId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req:any, res:any) {
    lessonPlanBusinessManager
        .protectedCreate(req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error.message}));
}

function update (req:any, res:any) {
    lessonPlanBusinessManager
        .protectedUpdate(req.params.lessonPlanId, req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
    // delete all related lesson plan steps
    lessonPlanBusinessManager
        .protectedDelete(req.params.lessonPlanId, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function copy (req: any, res: any) {
    lessonPlanBusinessManager
        .copy(req.params.lessonPlanId, null, [], null, true)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
