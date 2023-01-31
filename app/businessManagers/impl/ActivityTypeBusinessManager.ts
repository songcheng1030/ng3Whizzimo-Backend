import {inject, injectable} from "inversify";
import IActivityTypeBusinessManager from "../IActivityTypeBusinessManager";
import IActivityTypeDataManager from "../../dataManagers/IActivityTypeDataManager";
import TYPES from "../../../types";

@injectable()
class ActivityTypeBusinessManager implements IActivityTypeBusinessManager {
    private _activityTypeDataManager:IActivityTypeDataManager;

    constructor(
        @inject(TYPES.ActivityTypeDataManager) activityTypeDataManager: IActivityTypeDataManager
    ){
        this._activityTypeDataManager = activityTypeDataManager;
    }

    getAll(): Promise<any> {
        return this._activityTypeDataManager.getAll();
    }

}

export {ActivityTypeBusinessManager};
