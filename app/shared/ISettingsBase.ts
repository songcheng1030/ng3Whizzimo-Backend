import {Settings} from "../models/Settings";

export default interface ISettingsBase {
    get(settingsId: string): Promise<any>;
    getByUserId(userId: string): Promise<any>;
    getMany(userId: string): Promise<any>;
    update(settingsId: string, updatedSettings: any): Promise<any>;
    updateFirst(userId: string, data: any): Promise<any>;
    updateMany( userId: string, data: any): Promise<any>;
    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any>
    create(newSettings: any): Promise<any>;
    remove(settingsId: string): Promise<any>;
}
