import {PlanBusinessManager} from "../businessManagers/impl/PlanBusinessManager";

const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";

// @ts-ignore
const planBusinessManager = container.get<PlanBusinessManager>(TYPES.PlanBusinessManager);

router.get('/', getMany)

function getMany(req: any, res: any) {
    planBusinessManager
        .getActive()
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
