const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {ActivityTypeBusinessManager} from "../businessManagers/impl/ActivityTypeBusinessManager";

// @ts-ignore
const activityTypeBusinessManager = container.get<ActivityTypeBusinessManager>(TYPES.ActivityTypeBusinessManager);

router.get('/all', getActivityTypes);

function getActivityTypes(req:any, res:any) {
    activityTypeBusinessManager
        .getAll()
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
