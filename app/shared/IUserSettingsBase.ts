import {UserSettings} from "../models/UserSettings";

export default interface IUserSettingsBase {
    get(userSettingsId: string): Promise<any>;
    getMany(userId: string): Promise<any>;
    update(usersettingsId: string, updatedUserSettings: UserSettings): Promise<any>;
    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any>
    create(newUserSettings: UserSettings): Promise<any>;
    remove(userSettingsId: string): Promise<any>;
}
