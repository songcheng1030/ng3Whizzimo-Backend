import {inject, injectable} from "inversify";

import IBundleContentBusinessManager from "../IBundleContentBusinessManager";
import IBundleContentDataManager from "../../dataManagers/IBundleContentDataManager";
import TYPES from "../../../types";

@injectable()
class BundleContentBusinessManager implements IBundleContentBusinessManager {
    private _bundleContentDataManager:IBundleContentDataManager;

    constructor(
        @inject(TYPES.BundleContentDataManager) bundleContentDataManager:IBundleContentDataManager
    ){
        this._bundleContentDataManager = bundleContentDataManager;
    }

    create(data: any): Promise<any> {
        return this._bundleContentDataManager.create(data);
    }

    delete(id: string): Promise<any> {
        return this._bundleContentDataManager.delete(id);
    }

    get(id: string): Promise<any> {
        return this._bundleContentDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._bundleContentDataManager.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._bundleContentDataManager.update(id, data);
    }

    deleteByBundleId(bundleId: string): Promise<any> {
        return this._bundleContentDataManager.deleteByBundleId(bundleId);
    }

    deleteByContentId(contentId: string): Promise<any> {
        return this._bundleContentDataManager.deleteByContentId(contentId);
    }

    deleteManyByContentId(contentIds: string[]): Promise<any> {
        return this._bundleContentDataManager.deleteManyByContentId(contentIds);
    }

}

export {BundleContentBusinessManager};
