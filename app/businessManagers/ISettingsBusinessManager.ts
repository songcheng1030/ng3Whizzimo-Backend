import ISettingsBase from "../shared/ISettingsBase";

export default interface ISettingsBusinessManager {
    updateCurrent(settingsId: string, userId: string): Promise<any>;
    getByUserId(settingsId: string): Promise<any>;
    getMany(userId: string): Promise<any>;
    update(settingsId: string, updatedSettings: any): Promise<any>;
    updateMany( userId: string, data: any): Promise<any>;
    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any>
    create(userId: string, name: any): Promise<any>;
    remove(settingsId: string): Promise<any>;
    copy(settingsId:string, ownerKey:string, changeName: boolean):Promise<any>;
}
