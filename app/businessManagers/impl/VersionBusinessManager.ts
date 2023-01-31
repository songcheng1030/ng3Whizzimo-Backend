import { inject, injectable } from 'inversify'
import TYPES from '../../../types'
import IVersionDataManager from '../../dataManagers/IVersionDataManager'
import IVersionBusinessManager from '../IVersionBusinessManager'

@injectable()
class VersionBusinessManager implements IVersionBusinessManager {
  private _versionDataManager: IVersionDataManager

  constructor (
    @inject(TYPES.VersionDataManager) versionDataManager: IVersionDataManager
  ) {
    this._versionDataManager = versionDataManager
  }

  get (): Promise<any> {
    return this._versionDataManager.get()
  }

  update (version: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._versionDataManager
        .update(version)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error))
    })
  }
}

export { VersionBusinessManager }
