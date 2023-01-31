const router = (module.exports = require('express').Router());
import TYPES from "../../types";
import container from "./../../inversify.base.config";
import {CourseWorkbookActivityBusinessManager} from "../businessManagers/impl/CourseWorkbookActivityBusinessManager";

// @ts-ignore
const courseWorkbookActivityBusinessManager = container.get<CourseWorkbookActivityBusinessManager>(TYPES.CourseWorkbookActivityBusinessManager);

router.get('/courseWorkbook/:courseWorkbookId/activityType/:activityTypeId', getCourseWorkbookActivity);
router.put('/:courseWorkbookActivityId', updateCourseWorkbookActivity);

function getCourseWorkbookActivity(req: any, res: any) {
    courseWorkbookActivityBusinessManager
        .getByCourseWorkbookAndActivityType(req.params.courseWorkbookId, req.params.activityTypeId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => {
            res.status(500).json({error: error})
        });
}

function updateCourseWorkbookActivity(req: any, res: any) {
    courseWorkbookActivityBusinessManager
        .protectedUpdate(req.params.courseWorkbookActivityId, req.body, req.locals)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
