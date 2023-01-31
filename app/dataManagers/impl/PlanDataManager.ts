import {inject, injectable} from "inversify";
import IPlanDataManager from "../IPlanDataManager";
import IPlanBase from "../../shared/IPlanBase";
import TYPES from "../../../types";

@injectable()
class PlanDataManager implements IPlanDataManager {
    private _dao: IPlanBase;

    constructor(
        @inject(TYPES.PlanDataObject) dao:IPlanBase
    ) {
        this._dao = dao;
    }


    getActive(): Promise<any> {
        return this._dao.getActive();
    }

    getAll(): Promise<any> {
        return this._dao.getAll();
    }

}

export {PlanDataManager};
