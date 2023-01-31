import { UserActivitySettings } from "../models/UserActivitySettings";

export default interface IUserActivitySettingsBase {
    get(userActivitySettingsId: string): Promise<any>;
    getMany(userId: string): Promise<any>;
    update(userActivitySettingsId: string, updatedUserActivitySettings: UserActivitySettings): Promise<any>;
    updateMany( userId: string, data: any): Promise<any>;
    create(newUserActivitySettings: UserActivitySettings): Promise<any>;
    remove(userActivitySettingsId: string): Promise<any>;
}