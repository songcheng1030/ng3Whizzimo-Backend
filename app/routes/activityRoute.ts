import ActivityBusinessManager from "../businessManagers/impl/ActivityBusinessManager";

const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";

// @ts-ignore
const activityBusinessManager = container.get<ActivityBusinessManager>(TYPES.ActivityBusinessManager);

router.post('/workbookTiles', workbookTilesInit);
router.post('/blackboard', blackboardInit);
router.post('/miniTiles', miniTilesInit);

function workbookTilesInit(req: any, res: any) {
    activityBusinessManager
        .workbookTilesInit(req.body.workbookTilesInitRequest)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => {
            console.log(error);
            res.status(500).json({error: error})
        });
}

function blackboardInit(req: any, res: any) {

    activityBusinessManager
        .blackboardInit(req.body.blackboardInitRequest)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function miniTilesInit(req: any, res: any) {
    activityBusinessManager
        .miniTilesInit(req.body.miniTilesInitRequest)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => {
            console.log(error);
            res.status(500).json({error: error})
        });
}
