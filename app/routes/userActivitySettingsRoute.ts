import container from '../../inversify.base.config';
import TYPES from '../../types';
import {UserActivitySettingsBusinessManager} from "../businessManagers/impl/UserActivitySettingsBusinessManager";
const router = (module.exports = require('express').Router());
const ObjectId = require('bson-objectid');

// @ts-ignore
const userActivitySettingsBusinessManager = container.get<UserActivitySettingsBusinessManager>(TYPES.UserActivitySettingsBusinessManager);

router.get('/:userActivitySettingsId', get);
router.get('/user/:userId', getMany);
router.put('/update/:userActivitySettingsId', update);
router.put('/updateCurrent/:userActivitySettingsId/:userId', updateCurrent)
router.post('/:userId', create);
router.post('/copy/:userActivitySettingsId', copy)
router.delete('/:userActivitySettingsId', remove);

function get(req: any, res: any){
    userActivitySettingsBusinessManager
        .get(req.params.userActivitySettingsId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}))
}

function getMany(req: any, res: any) {
    userActivitySettingsBusinessManager
        .getMany(req.params.userId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function update(req: any, res: any){
    userActivitySettingsBusinessManager
        .update(req.params.userActivitySettingsId, req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}
function updateCurrent(req: any, res: any){
    userActivitySettingsBusinessManager
    .updateCurrent(req.params.userActivitySettingsId, req.params.userId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));

}

function create (req: any, res: any){
    console.log('triggered')
    userActivitySettingsBusinessManager
        .create(req.params.userId, req.body)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}));
}

function copy(req: any, res: any){
    userActivitySettingsBusinessManager
        .copy(req.params.userActivitySettingsId, req.body.ownerKey)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error.message}));

}

function remove(req: any, res: any) {
    console.log('triggered')
    userActivitySettingsBusinessManager
        .remove(req.params.userActivitySettingsId)
        .then((result: any) => res.status(200).json({data: result}))
        .catch((error: any) => res.status(500).json({error: error}))
}
