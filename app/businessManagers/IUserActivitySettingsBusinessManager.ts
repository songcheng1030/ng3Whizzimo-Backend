import { UserActivitySettings} from '../models/UserActivitySettings';

export default interface IUserActivitySettingsBusinessManager {
    get(userActivitySettingsId: string): Promise<any>;
    getMany(userId: string): Promise <any>;
    update(userActivitySettingsId: string, updatedUserActivitySettings: any): Promise<any>;
    updateMany(userId: string, data: any): Promise<any>;
    updateCurrent(userActivitySettingsId: string, userId: string): Promise<any>;
    create(userId: string, name: any): Promise<any>;
    copy(userActivitySettingsId: string, userId: string): Promise<any>;
    remove(userActivitySettingsId: string): Promise<any>;

}