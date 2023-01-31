import IBundleDataManager from "../IBundleDataManager";
import {inject, injectable} from "inversify";
import IBundleMongoDao from "../../dataObjects/IBundleMongoDao";
import TYPES from "../../../types";
import IBundleBase from "../../shared/IBundleBase";

@injectable()
class BundleDataManager implements IBundleDataManager {
    private _dao:IBundleBase;

    constructor(
        @inject(TYPES.BundleDataObject) dao:IBundleBase
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

    getByCode(code: string): Promise<any> {
        return this._dao.getByCode(code);
    }

    getMany(id: string): Promise<any> {
        return this._dao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

}

export {BundleDataManager};
