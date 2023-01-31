import {inject, injectable} from "inversify";
import IAccIndexBusinessManager from "../IAccIndexBusinessManager";
import IAccIndexDataManager from "../../dataManagers/IAccIndexDataManager";
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";

@injectable()
class AccIndexBusinessManager implements IAccIndexBusinessManager {
    _accIndexDataManager:IAccIndexDataManager;

    constructor(
      @inject(TYPES.AccIndexDataManager) accIndexDataManager:IAccIndexDataManager
    ){
       this._accIndexDataManager = accIndexDataManager;
    }

    get(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._accIndexDataManager
                .get()
                .then((result: any) => { resolve(result) })
                .catch((error:any) => { reject(error) });
        });
    }

    update(): Promise<any> {
        return this._accIndexDataManager.update();
    }

}

export {AccIndexBusinessManager};
