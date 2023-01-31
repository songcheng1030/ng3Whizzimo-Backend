import {injectable} from "inversify";
import IUserSettingsBase from "../../../app/shared/IUserSettingsBase";
import {UserSettings} from "../../../app/models/UserSettings";

@injectable()
class UserSettingsMockDao implements IUserSettingsBase {
    private db:any[] = [];

    create(newUserSettings: UserSettings): Promise<any> {
        return new Promise((resolve) => {
            this.db.push(newUserSettings);
            resolve(null);
        });
    }

    get(userSettingsId: string): Promise<any> {
        return undefined;
    }

    getMany(userId: string): Promise<any> {
        return undefined;
    }

    remove(userSettingsId: string): Promise<any> {
        return undefined;
    }

    update(userSettingsId: string, updatedUserSettings: UserSettings): Promise<any> {
        return undefined;
    }

    updateCompoundSound(userSettingsId: string, compoundSound: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}

export {UserSettingsMockDao};
