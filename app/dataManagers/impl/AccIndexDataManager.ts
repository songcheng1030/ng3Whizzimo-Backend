import {inject, injectable} from "inversify";
import IAccIndexDataManager from "../IAccIndexDataManager";
import TYPES from "../../../types";
import IAccIndexMongoDao from "../../dataObjects/IAccIndexMongoDao";
import IAccIndexBase from "../../shared/IAccIndexBase";

@injectable()
class AccIndexDataManager implements IAccIndexDataManager {
    _dao: IAccIndexBase;

    constructor(
        @inject(TYPES.AccIndexDataObject) dao:IAccIndexBase
    ) {
        this._dao = dao;
    }
    update(): Promise<any> {
        return this._dao.update();
    }

    get(): Promise<any> {
        return this._dao.get();
    }

}

export {AccIndexDataManager}
