import IVersionBase from '../../shared/IVersionBase'
import { injectable } from 'inversify'
import { version } from '../../db'

@injectable()
class VersionMongoDao implements IVersionBase {
  get (): Promise<any> {
    return new Promise((resolve, reject) => {
      version
        .findOne()
        .then((result: any) => {
          resolve(result.version)
        })
        .catch((error: any) => reject(error))
    })
  }

  update (newVersion: number): Promise<any> {
    return new Promise((resolve, reject) => {
      version
        .findOne()
        .then((doc: any) => {
          version
            .update(
              { _id: doc._id },
              { $set: { version: newVersion || doc.version + 1 } }
            )
            .then((result: any) => {
              resolve(true)
            })
            .catch((error: any) => reject(error))
        })
        .catch((e: any) => reject(e))
    })
  }
}

export { VersionMongoDao }
