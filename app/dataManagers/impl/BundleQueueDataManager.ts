import IBundleQueueDataManager from "../IBundleQueueDataManager";
import {inject, injectable} from "inversify";
import IBundleQueueMongoDao from "../../dataObjects/IBundleQueueMongoDao";
import TYPES from "../../../types";
import IBundleQueueBase from "../../shared/IBundleQueueBase";

@injectable()
class BundleQueueDataManager implements IBundleQueueDataManager {
    private _dao:IBundleQueueBase;

    constructor(
        @inject(TYPES.BundleQueueDataObject) dao:IBundleQueueBase
    ) {
        this._dao = dao;
    }

    create(data: any): Promise<any> {
        return this._dao.create(data);
    }

    delete(id: string): Promise<any> {
        return this._dao.delete(id);
    }

    get(id: string): Promise<any> {
        return undefined;
    }

    getMany(id: string): Promise<any> {
        return this._dao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }

    deleteByBundleId(bundleId: string): Promise<any> {
        return this._dao.deleteByBundleId(bundleId);
    }

}

export {BundleQueueDataManager};
