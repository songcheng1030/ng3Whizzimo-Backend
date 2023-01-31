import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {UserSettingsBusinessManager} from "../businessManagers/impl/UserSettingsBusinessManager";
const router = (module.exports = require('express').Router());

// @ts-ignore
const userSettingsBusinessManager = container.get<UserSettingsBusinessManager>(TYPES.UserSettingsBusinessManager);

router.get('/user/:userId', getMany);
router.put('/:userSettingsId', update);
router.put('/compoundSounds/:userSettingsId', updateCompoundSounds);

function getMany (req:any, res:any) {

  userSettingsBusinessManager
    .getMany(req.params.userId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
  userSettingsBusinessManager.protectedUpdate(req.params.userSettingsId, req.body, req.locals)
    .then((result:any) => res.status(200).json({data: result}))
    .catch((error:any) => res.status(500).json({error: error}));
}

function updateCompoundSounds (req:any, res:any) {
  userSettingsBusinessManager.updateCompoundSound(req.params.userSettingsId, req.body)
      .then((result:any) => res.status(200).json({data: result}))
      .catch((error:any) => res.status(500).json({error: error}));
}
