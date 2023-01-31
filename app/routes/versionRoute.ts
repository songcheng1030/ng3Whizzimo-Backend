const router = (module.exports = require('express').Router())
import container from '../../inversify.base.config'
import TYPES from '../../types'
import { VersionBusinessManager } from '../businessManagers/impl/VersionBusinessManager'

// @ts-ignore
const versionBussinessManager = container.get<VersionBusinessManager>(
  TYPES.VersionBusinessManager
)

router.get('/', get)
router.put('/:version?', update)

function get (req: any, res: any) {
  versionBussinessManager
    .get()
    .then((result: any) => res.status(200).json({ data: result }))
    .catch((error: any) => res.status(500).json({ error: error }))
}

function update (req: any, res: any) {
  versionBussinessManager
    .update(parseInt(req.params?.version || '0'))
    .then((result: any) => res.status(200).json({ data: result }))
    .catch((error: any) => res.status(500).json({ error: error }))
}
