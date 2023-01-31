import {inject, injectable} from "inversify";
import IPlanBusinessManager from "../IPlanBusinessManager";
import TYPES from "../../../types";
import IPlanDataManager from "../../dataManagers/IPlanDataManager";

@injectable()
class PlanBusinessManager implements IPlanBusinessManager {
    private _planDataManager: IPlanDataManager;

    constructor(
        @inject(TYPES.PlanDataManager) planDataManager: IPlanDataManager
    ) {
        this._planDataManager = planDataManager;

    }

    getActive(): Promise<any> {
        return this._planDataManager.getActive();
    }

    getAll(): Promise<any> {
        return this._planDataManager.getAll();
    }

}

export {PlanBusinessManager};
