import {CourseBusinessManager} from "../businessManagers/impl/CourseBusinessManager";
const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {Utility} from './../utility';

// @ts-ignore
const courseBusinessManager = container.get<CourseBusinessManager>(TYPES.CourseBusinessManager);

router.get('/user/:userId', getMany);
router.get('/shared/:sharedKey', getShared);
router.get('/:courseId', get);
router.post('/', create);
router.put('/:courseId', update);
router.post('/copy/:courseId', copy);
router.delete('/:courseId', remove);

function getMany (req: any, res: any) {
    courseBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function get (req: any, res: any) {
    courseBusinessManager
        .get(req.params.courseId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function getShared(req: any, res: any) {
    courseBusinessManager
        .getBySharedKey(req.params.sharedKey)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function create (req: any, res: any) {
    if(!req.locals.admin && req.body.teacherKey !== req.locals.userId) {
        return res.status(403).json({error: Utility.errorText.notAuthorized});
    }

    courseBusinessManager
        .create(req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update (req: any, res: any) {
    if(!req.locals.admin && req.body.teacherKey !== req.locals.userId) {
        return res.status(403).json({error: Utility.errorText.notAuthorized});
    }

    courseBusinessManager.update(req.params.courseId, req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(error === Utility.errorText.notFound('Course') ? 404 : 500).json({error: error}));
}

function copy (req: any, res: any) {
    courseBusinessManager
        .copy(req.params.courseId, req.locals.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(error === Utility.errorText.notFound('Course') ? 404 : 500).json({error: error}));
}

function remove (req: any, res: any) {
    courseBusinessManager.delete(req.params.courseId)
        .then((result: any) => {
            res.status(200).json({data: result})
        })
        .catch((error: any) => {
            res.status(500).json({error: error})
        });
}
