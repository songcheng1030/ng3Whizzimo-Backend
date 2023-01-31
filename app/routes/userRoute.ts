import container from "./../../inversify.base.config";
import TYPES from "../../types";
import {UserBusinessManager} from "../businessManagers/impl/UserBusinessManager";
const router = (module.exports = require('express').Router());
const ObjectId = require('bson-objectid');
const {errorText} = require('./../utility');

// @ts-ignore
const userBusinessManager = container.get<UserBusinessManager>(TYPES.UserBusinessManager);

router.get('/:userId', get);
router.get('/email/:email', getByEmail);
router.put('/:userId', update);
router.delete('/:userId', remove);

function get (req:any, res:any) {
  const userId = ObjectId.isValid(req.params.userId) ? ObjectId(req.params.userId) : req.params.userId;
  userBusinessManager
    .get(userId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));
}

function getByEmail (req:any, res:any) {
  userBusinessManager
      .getByEmail(req.params.email)
      .then((result: any) => res.status(200).json({data: result}))
      .catch((error: any) => res.status(500).json({error: error}));
}

function update (req:any, res:any) {
  const userId = ObjectId.isValid(req.params.userId) ? ObjectId(req.params.userId) : req.params.userId;

  userBusinessManager.update(req.body, userId)
    .then((result: any) => res.status(200).json({data: result}))
    .catch((error: any) => res.status(500).json({error: error}));
}

function remove (req:any, res:any) {
  if(!req.locals.admin) {
    return res.status(404).json({error: errorText.notAuthorized});
  }

  const userId = ObjectId.isValid(req.params.userId) ? ObjectId(req.params.userId) : req.params.userId;

  userBusinessManager.delete(userId)
      .then((result: any) => res.status(200).json({data: result}))
      .catch((error: any) => res.status(500).json({error: error}));
}

