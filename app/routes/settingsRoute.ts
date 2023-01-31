import container from "./../../inversify.base.config";
import TYPES from "../../types";
import SettingsBusinessManager from "../businessManagers/impl/SettingsBusinessManager";
const router = (module.exports = require('express').Router());

// @ts-ignore
const settingsBusinessManager = container.get<SettingsBusinessManager>(TYPES.SettingsBusinessManager);

router.get('/:userId', get);
router.get('/user/:userId', getMany);
router.put('/:settingsId', update);
router.put('/updateCurrent/:settingsId/:userId', updateCurrent)
router.put('/compoundSounds/:settingsId', updateCompoundSounds);
router.post('/:userId', create);
router.post('/copy/:settingsId', copy)
router.delete('/:settingsId', remove);

function get(req: any, res: any){
    settingsBusinessManager
        .getByUserId(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}))
}

function getMany (req:any, res:any) {
    settingsBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
    settingsBusinessManager.update(req.params.settingsId, req.body)
        .then((result:any) => res.status(200).json({data: result}))
        .catch((error:any) => res.status(500).json({error: error}));
}

function updateCompoundSounds (req:any, res:any) {
    settingsBusinessManager.updateCompoundSound(req.params.settingsId, req.body)
        .then((result:any) => {
            return res.status(200).json({data: result})
        })
        .catch((error:any) => {
            return res.status(500).json({error: error})
        });
}

function updateCurrent(req: any, res: any){
    settingsBusinessManager
        .updateCurrent(req.params.settingsId, req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));

}

function create (req: any, res: any){
    settingsBusinessManager
        .create(req.params.userId, req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function copy(req: any, res: any){
    settingsBusinessManager
        .copy(req.params.settingsId, req.body.ownerKey)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error.message}));

}

function remove(req: any, res: any) {
    settingsBusinessManager
        .remove(req.params.settingsId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}))
}

