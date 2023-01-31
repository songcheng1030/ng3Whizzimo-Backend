import {inject, injectable} from "inversify";
import IPhraseBusinessManager from "../IPhraseBusinessManager";
import IPhraseDataManager from "../../dataManagers/IPhraseDataManager";
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";
import IWorkbookPhraseDataManager from "../../dataManagers/IWorkbookPhraseDataManager";

@injectable()
class PhraseBusinessManager implements IPhraseBusinessManager {
    private _phraseDataManager:IPhraseDataManager;
    private _workbookPhraseDataManager:IWorkbookPhraseDataManager;
    constructor(
        @inject(TYPES.PhraseDataManager) phraseDataManager:IPhraseDataManager,
        @inject(TYPES.WorkbookPhraseDataManager) workbookPhraseDataManager:IWorkbookPhraseDataManager
    ){
        this._phraseDataManager = phraseDataManager;
        this._workbookPhraseDataManager = workbookPhraseDataManager;
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.phrase || !data.ownerKey) {
                return reject(Errors.missingParametersBody);
            }

            this._phraseDataManager
                .create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._phraseDataManager
                .delete(id)
                .then(() => {
                    return this._workbookPhraseDataManager.deleteMany(id)
                })
                .then(() => {
                    resolve(null);
                })
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        return this._phraseDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._phraseDataManager.getMany(id);
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
            if(!data.phrase) {
                return reject(Errors.missingParametersBody);
            }

            this._phraseDataManager
                .update(id, data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    validateOwner(id: string, locals: any): Promise<any> {
        if(locals.admin)
            return Promise.resolve(null);

        return new Promise((resolve, reject) => {
            this._phraseDataManager
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

export {PhraseBusinessManager};
