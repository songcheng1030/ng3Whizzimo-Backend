import IUserSettingsBase from "../shared/IUserSettingsBase";
import {UserSettings} from "../models/UserSettings";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";

export default interface IUserSettingsBusinessManager extends IProtectedRequestBase {
    get(userSettingsId: string): Promise<any>;
    getMany(userId: string): Promise<any>;
    update(userSettingsId: string, updatedUserSettings: UserSettings): Promise<any>;
    create(userId: string): Promise<any>;
    remove(userSettingsId: string): Promise<any>;
    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any>;
    copy(userSettingsId: string, ownerKey: string, changeName: boolean): Promise<any>;
}
