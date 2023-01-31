import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import IActivityTypeDataManager from "../IActivityTypeDataManager";
import IActivityTypeBase from "../../shared/IActivityTypeBase";

@injectable()
class ActivityTypeDataManager implements IActivityTypeDataManager {
    private _dao:IActivityTypeBase;

    constructor(
        @inject(TYPES.ActivityTypeDataObject) dao:IActivityTypeBase
    ) {
        this._dao = dao;
    }

    getAll(): Promise<any> {
        return this._dao.getAll();
    }

}

export {ActivityTypeDataManager};
