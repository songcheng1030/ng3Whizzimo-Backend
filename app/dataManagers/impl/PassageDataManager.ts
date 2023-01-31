import {inject, injectable} from "inversify";
import IPassageDataManager from "../IPassageDataManager";
import IPassageMongoDao from "../../dataObjects/IPassageMongoDao";
import TYPES from "../../../types";
import IPassageBase from "../../shared/IPassageBase";

@injectable()
class PassageDataManager implements IPassageDataManager {
    private _dao:IPassageBase;

    constructor(
        @inject(TYPES.PassageDataObject) dao:IPassageBase
    ){
        this._dao = dao;
    }

    create(data: any): Promise<any> {
        return this._dao.create(data);
    }

    delete(id: string): Promise<any> {
        return this._dao.delete(id);
    }

    get(id: string): Promise<any> {
        return this._dao.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._dao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

}

export {PassageDataManager};
