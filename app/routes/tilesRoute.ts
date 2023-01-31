import {TilesBusinessManager} from "../businessManagers/impl/TilesBusinessManager";
const router = (module.exports = require('express').Router());
import container from "./../../inversify.base.config";
import TYPES from "../../types";

// @ts-ignore
let tilesBusinessManager = container.get<TilesBusinessManager>(TYPES.TilesBusinessManager);

router.get('/', get);
router.get('/:query', query);

function query (req:any, res:any) {
    tilesBusinessManager.query(req.params.query)
        .then((result:any) => res.status(200).json({data: result}))
        .catch((error:any) => res.status(500).json({error: error}));
}

function get(req: any, res: any) {
    tilesBusinessManager.get()
        .then((result:any) => res.status(200).json({data: result}))
        .catch((error:any) => res.status(500).json({error: error}));
}
