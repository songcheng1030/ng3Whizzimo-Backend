import {inject, injectable} from "inversify";
import ISentenceBusinessManager from "../ISentenceBusinessManager";
import ISentenceDataManager from "../../dataManagers/ISentenceDataManager";
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";
import IWorkbookSentenceDataManager from "../../dataManagers/IWorkbookSentenceDataManager";

@injectable()
class SentenceBusinessManager implements ISentenceBusinessManager {
    private _sentenceDataManager:ISentenceDataManager;
    private _workbookSentenceDataManager: IWorkbookSentenceDataManager;

    constructor(
        @inject(TYPES.SentenceDataManager) sentenceDataManager:ISentenceDataManager,
        @inject(TYPES.WorkbookSentenceDataManager) workbookSentenceDataManager: IWorkbookSentenceDataManager
    ){
        this._sentenceDataManager = sentenceDataManager;
        this._workbookSentenceDataManager = workbookSentenceDataManager
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.sentence || !data.ownerKey) {
                return reject(Errors.missingParametersBody);
            }

            this._sentenceDataManager
                .create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._sentenceDataManager
                .delete(id)
                .then(() => {
                    return this._workbookSentenceDataManager.deleteMany(id)
                })
                .then(() => {
                  resolve(null);
                })
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        return this._sentenceDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._sentenceDataManager.getMany(id);
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
            if(!data.sentence) {
                return reject(Errors.missingParametersBody);
            }

            this._sentenceDataManager.update(id, data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    validateOwner(id: string, locals: any): Promise<any> {
        if(locals.admin)
            return Promise.resolve(null);

        return new Promise((resolve, reject) => {
            this._sentenceDataManager
                .get(id)
                .then((result: any) => {
                    if(!result || result.ownerKey !== locals.userId) {
                        return reject(Errors.notAuthorized);
                    }

                    resolve(null);
                })
                .catch((error: any) => reject(error));
        });
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        return undefined;
    }

}

export {SentenceBusinessManager};
