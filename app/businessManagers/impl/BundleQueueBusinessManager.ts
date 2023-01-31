import IBundleQueueBusinessManager from "../IBundleQueueBusinessManager";
import {inject, injectable} from "inversify";
import getDecorators from "inversify-inject-decorators";
import inversifyBaseConfig from '../../../inversify.base.config';
import IBundleQueueDataManager from "../../dataManagers/IBundleQueueDataManager";
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";
import IBundleBusinessManager from "../IBundleBusinessManager";
import IUserBusinessManager from "../IUserBusinessManager";

@injectable()
class BundleQueueBusinessManager implements IBundleQueueBusinessManager {
    private _bundleQueueDataManager:IBundleQueueDataManager;
    private _userBusinessManager:IUserBusinessManager;
    private  _bundleBusinessManager:IBundleBusinessManager;

    constructor(
        @inject(TYPES.BundleQueueDataManager) bundleQueueDataManager:IBundleQueueDataManager,
        @inject(TYPES.UserBusinessManager) userBusinessManager:IUserBusinessManager,
        @inject(TYPES.BundleBusinessManager) bundleBusinessManager:IBundleBusinessManager
    ){
        this._bundleQueueDataManager = bundleQueueDataManager;
        this._userBusinessManager = userBusinessManager;
        this._bundleBusinessManager = bundleBusinessManager;
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.ownerKey || !data.bundleId) {
                return reject(Errors.missingParametersBody);
            }

            this._bundleBusinessManager
                .get(data.bundleId)
                .then(bundle => {
                    if(!bundle) {
                        return reject(Errors.notFound('Bundle'));
                    }

                    return this._userBusinessManager.get(data.ownerKey);
                })
                .then(user => {
                    if(!user) {
                        return reject(Errors.notFound('User'));
                    }

                    return this._bundleQueueDataManager.create({ownerKey: user._id, bundleId: data.bundleId, createdAt: new Date()});
                })
                .then((result: any) => {
                    if(!result) {
                        return;
                    }

                    resolve(result)
                })
                .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        return this._bundleQueueDataManager.delete(id);
    }

    get(id: string): Promise<any> {
        return undefined;
    }

    getMany(id: string): Promise<any> {
        return this._bundleQueueDataManager.getMany(id);
    }

    send(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.userInfo || !data.bundleId) {
                return reject(Errors.missingParametersBody);
            }

            this._bundleBusinessManager
                .get(data.bundleId)
                .then(bundle => {
                    if(!bundle) {
                        return reject(Errors.notFound('Bundle'));
                    }

                    return this._userBusinessManager.getByIdOrEmail(data.userInfo);
                })
                .then(user => {
                    if(!user) {
                        return reject(Errors.notFound('User'));
                    }

                    return this._bundleQueueDataManager.create({ownerKey: user._id, bundleId: data.bundleId, createdAt: new Date()});
                })
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }

    deleteByBundleId(bundleId: string): Promise<any> {
        return this._bundleQueueDataManager.deleteByBundleId(bundleId);
    }

}

export {BundleQueueBusinessManager};
