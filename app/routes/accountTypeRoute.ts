import {SecurityBusinessManager} from "../businessManagers/impl/SecurityBusinessManager";
const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {Errors} from "../constants/Errors";
import {AccountTypeBusinessManager} from "../businessManagers/impl/AccountTypeBusinessManager";

// @ts-ignore
const accountTypeBusinessManager = container.get<AccountTypeBusinessManager>(TYPES.AccountTypeBusinessManager);

router.get('/all', getAccountTypes);

function getAccountTypes(req:any, res:any) {
    accountTypeBusinessManager
        .getMany()
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
