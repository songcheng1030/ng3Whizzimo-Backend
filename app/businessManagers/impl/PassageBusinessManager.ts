import {inject, injectable} from "inversify";
import IPassageBusinessManager from "../IPassageBusinessManager";
import IPassageDataManager from "../../dataManagers/IPassageDataManager";
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";
import IWorkbookPassageDataManager from "../../dataManagers/IWorkbookPassageDataManager";

@injectable()
class PassageBusinessManager implements IPassageBusinessManager {
    private _passageDataManager:IPassageDataManager;
    private _workbookPassageDataManager:IWorkbookPassageDataManager

    constructor(
        @inject(TYPES.PassageDataManager) passageDataManager:IPassageDataManager,
        @inject(TYPES.WorkbookPassageDataManager) workbookPassageDataManager:IWorkbookPassageDataManager
    ){
        this._passageDataManager = passageDataManager;
        this._workbookPassageDataManager = workbookPassageDataManager;
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.passage || !data.ownerKey) {
                return reject(Errors.missingParametersBody);
            }

            this._passageDataManager
                .create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._passageDataManager
                .delete(id)
                .then(() => {
                    return this._workbookPassageDataManager.deleteMany(id)
                })
                .then(() => {
                    resolve(null);
                })
                .catch((error: any) => reject(error));
        });
    }
    get(id: string): Promise<any> {
        return this._passageDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._passageDataManager.getMany(id);
    }

    protectedDelete(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => this.delete(id))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    protectedUpdate(id: string, data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => this.update(id, data))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.passage) {
                return reject(Errors.missingParametersBody);
            }

            if(data.ownerKey) {
                return reject(Errors.illegalParameters);
            }

            //ensure no one tries to update the id of the passage
            if(data._id) {
                delete data._id;
            }

            this._passageDataManager
                .update(id, data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    validateOwner(id: string, locals: any): Promise<any> {
        if(locals.admin)
            return Promise.resolve(null);

        return new Promise((resolve, reject) => {
            this._passageDataManager
                .get(id)
                .then((result: any) => {
                    if(!result || result.ownerKey !== locals.userId) {
                        return reject(Errors.notAuthorized);
                    }

                    resolve(null);
                })
        });
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        if(locals.admin) {
            return Promise.resolve(null);
        }

        return new Promise((resolve, reject) => {
            data.ownerKey = locals.userId;

            this.create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

}

export {PassageBusinessManager};
