import IBundleContentDataManager from "../IBundleContentDataManager";
import {inject, injectable} from "inversify";
import IBundleContentMongoDao from "../../dataObjects/IBundleContentMongoDao";
import TYPES from "../../../types";
import IBundleContentBase from "../../shared/IBundleContentBase";

@injectable()
class BundleContentDataManager implements IBundleContentDataManager {
    private _dao:IBundleContentBase;

    constructor(
        @inject(TYPES.BundleContentDataObject) dao:IBundleContentBase
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
        return null;
    }

    getMany(id: string): Promise<any> {
        return this._dao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

    deleteByBundleId(bundleId: string): Promise<any> {
        return this._dao.deleteByBundleId(bundleId);
    }

    deleteByContentId(contentId: string): Promise<any> {
        return this._dao.deleteByBundleId(contentId);
    }

    deleteManyByContentId(contentIds: string[]): Promise<any> {
        return this._dao.deleteManyByContentId(contentIds);
    }

}

export {BundleContentDataManager};
