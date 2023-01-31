import * as randomstring from 'randomstring';
import IBundleBusinessManager from "../IBundleBusinessManager";
import {inject, injectable} from "inversify";
import getDecorators from "inversify-inject-decorators";
import inversifyBaseConfig from '../../../inversify.base.config';
import IBundleDataManager from "../../dataManagers/IBundleDataManager";
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";
import INameToValueMap from "../../shared/INameToValueMap";
import IUserBusinessManager from "../IUserBusinessManager";
import IBundleContentBusinessManager from "../IBundleContentBusinessManager";
import ICourseBusinessManager from "../ICourseBusinessManager";
import IWorkbookBusinessManager from "../IWorkbookBusinessManager";
import ISettingsBusinessManager from "../ISettingsBusinessManager";

const objectId = require("bson-objectid");

@injectable()
class BundleBusinessManager implements IBundleBusinessManager {
    public _bundleDataManager:IBundleDataManager;
    public _userBusinessManager:IUserBusinessManager;
    public _bundleContentBusinessManager:IBundleContentBusinessManager;
    public _courseBusinessManager: ICourseBusinessManager;
    public _settingsBusinessManager: ISettingsBusinessManager;
    public _workbookBusinessManager: IWorkbookBusinessManager;

    constructor(
        @inject(TYPES.BundleDataManager) bundleDataManager:IBundleDataManager,
        @inject(TYPES.UserBusinessManager) userBusinessManager:IUserBusinessManager,
        @inject(TYPES.BundleContentBusinessManager) bundleContentBusinessManager:IBundleContentBusinessManager,
        @inject(TYPES.CourseBusinessManager) courseBusinessManager:ICourseBusinessManager,
        @inject(TYPES.SettingsBusinessManager) settingsBusinessManager:ISettingsBusinessManager,
        @inject(TYPES.WorkbookBusinessManager) workbookBusinessManager:IWorkbookBusinessManager
    ){
        this._courseBusinessManager = courseBusinessManager;
        this._settingsBusinessManager = settingsBusinessManager;
        this._workbookBusinessManager = workbookBusinessManager;
        this._bundleDataManager = bundleDataManager;
        this._userBusinessManager = userBusinessManager;
        this._bundleContentBusinessManager = bundleContentBusinessManager;
    }

    public validBundleTypes:INameToValueMap = [
        "course",
        "workbook",
        "settings",
        "userActivitySettings"
    ];

    apply(code: string, ownerKey: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let type: string = '';
                const bundle = await this.getByCode(code)

                if (!bundle) {
                    return reject(Errors.notFound("Bundle"));
                }

                type = bundle.type;

                const bundles = await this._bundleContentBusinessManager.getMany(code);
                let requests: any[] = [];

                bundles.forEach((bundleItem: any) => {
                    requests.push(
                        // @ts-ignore
                        this[`_${type}BusinessManager`].copy(bundleItem.contentId, ownerKey, false)
                    );
                });
                const results =await Promise.all(requests);
                    resolve({type, count: results.length});
            } catch (error) {
                reject(error);
            }
        });
    }

    createMany(data: any[]): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const dts = [];
            for(let dt of data){
                try {
                    let dtRes = await this.apply(dt.bundleCode, dt.userId);
                    dts.push(dtRes);
                }
                catch(ex){
                    return reject(ex);
                }
            }
            return resolve(dts);
        });
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.name || !data.ownerKey || !data.bundleItems || !data.type) {
                return reject(Errors.missingParametersBody);
            }

            if(!data.bundleItems.length || data.bundleItems.length === 0) {
                return reject(Errors.noBundleItems);
            }

            if(this.validBundleTypes.indexOf(data.type) < 0) {
                return reject(Errors.invalidBundleType);
            }

            let newBundle: any;


            const code = randomstring.generate({length: 6, charset: 'alphanumeric'});
            return this._bundleDataManager.create({
                ownerKey: data.ownerKey,
                type: data.type,
                name: data.name,
                code: code
            })
            .then((result) => {
                if(!result) return;

                newBundle = result;
                console.log('bundle data', data.bundleItems)
                // create bundleItems
                const insertRequests:any[] = [];
                data.bundleId = result._id;
                data.bundleItems.forEach((item:any) => {
                    insertRequests.push(
                        this._bundleContentBusinessManager.create({
                            ownerKey: data.ownerKey,
                            bundleCode: result.code,
                            contentId: objectId.isValid(item._id) ? objectId(item._id) : item._id,
                        })
                    );
                });

                return Promise.all(insertRequests)
            })
            .then((result: any) => {
                if(!result) return;
                resolve(newBundle);
            })
            .catch((error: any) => {
                // delete bundle that was created and bundle content that was created
                if(data.bundleId) {
                    return this._bundleDataManager.delete(data.bundleId)
                        .then(() => reject(error))
                        .catch((error: any) => reject(Errors.rollbackError + ':' + error));
                }

                return reject(error);
            });
        });
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._bundleDataManager
                .delete(id)
                .then(() => this._bundleContentBusinessManager.deleteByBundleId(id))
                .then(() => resolve('Deleted Successfully!'))
                .catch((error: any) => reject(error));
        }) ;
    }

    get(id: string): Promise<any> {
        return this._bundleDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._bundleDataManager.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(data.ownerKey || data.code || data.type || data._id) {
                return reject(Errors.illegalParameters);
            }

            this._bundleDataManager
                .update(id, data)
                .then((result:any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    protectedDelete(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => this.delete(id))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    protectedUpdate(id: string, data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => this.update(id, data))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    validateOwner(bundleId: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.get(bundleId)
                .then((result: any) => {
                    if(!result || result.ownerKey !== locals.userId) {
                        return reject(Errors.notAuthorized);
                    }
                    return resolve('OK');
                })
                .catch((error: any) => reject(error));
        });
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    getByCode(code: string): Promise<any> {
        return this._bundleDataManager.getByCode(code);
    }
}

export {BundleBusinessManager};
