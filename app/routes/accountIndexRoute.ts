const router = (module.exports = require('express').Router());
import  container from "./../../inversify.base.config";
import TYPES from "../../types";
import {Errors} from "../constants/Errors";
import {AccIndexBusinessManager} from "../businessManagers/impl/AccIndexBusinessManager";

// @ts-ignore
const accountIndexBusinessManager = container.get<AccIndexBusinessManager>(TYPES.AccIndexBusinessManager);

router.get('/', getNextAccountIndex);

function getNextAccountIndex(req: any, res: any) {
    if(!req.locals.admin) {
        return res.status(403).json({error: Errors.notAuthorized});
    }

    accountIndexBusinessManager
        .update()
        .then((result: any) => {
            res.status(200).json({data: `WhizzimoAcademy:${result.accIndex}`})
        })
        .catch((err: any) =>{
            res.status(500).json({error: err.message});
        });
}
