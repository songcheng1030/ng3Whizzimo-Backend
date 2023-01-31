import { inject, injectable } from 'inversify'
import TYPES from '../../../types'
import IVersionBase from '../../shared/IVersionBase'
import IVersionDataManager from '../IVersionDataManager'

@injectable()
class VersionDataManager implements IVersionDataManager {
  private _dao: IVersionBase

  constructor (
    @inject(TYPES.VersionDataObject) versionDataObject: IVersionBase
  ) {
    this._dao = versionDataObject
  }

  get (): Promise<any> {
    return this._dao.get()
  }

  update (version: number): Promise<any> {
    return this._dao.update(version)
  }
}

export { VersionDataManager }
