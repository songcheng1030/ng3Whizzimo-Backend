import {inject, injectable} from 'inversify';
import IUserActivitySettingsBase from '../../shared/IUserActivitySettingsBase';
import {UserActivitySettings} from '../../models/UserActivitySettings';
import TYPES from '../../../types';

@injectable()
class UserActivitySettingsDataManager implements IUserActivitySettingsBase {
    _dao: IUserActivitySettingsBase;

    constructor(
        @inject(TYPES.UserActivitySettingsObject) dao: IUserActivitySettingsBase
    ){
        this._dao = dao;
    }
    updateMany(userId: string, data: any): Promise<any> {
        return this._dao.updateMany(userId, data);
    }

    create(newUserActivitySettings: UserActivitySettings): Promise<any> {
        return this._dao.create(newUserActivitySettings);
    }

    get(userActivitySettingsId: string): Promise<any> {
        return this._dao.get(userActivitySettingsId);
    }

    getMany(userId: string): Promise<any> {
        return this._dao.getMany(userId);
    }

    remove(userActivitySettingsId: string): Promise<any> {
        return this._dao.remove(userActivitySettingsId);
    }

    update(userActivitySettingsId: string, updatedUserActivitySettings: UserActivitySettings): Promise<any> {
        return this._dao.update(userActivitySettingsId, updatedUserActivitySettings);
    }
}

export { UserActivitySettingsDataManager}