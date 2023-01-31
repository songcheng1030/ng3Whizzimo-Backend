import {inject, injectable} from "inversify";
import getDecorators from "inversify-inject-decorators";
import inversifyBaseConfig from '../../../inversify.base.config';
import IWorkbookPassageBusinessManager from "../IWorkbookPassageBusinessManager";
import IWorkbookPassageDataManager from "../../dataManagers/IWorkbookPassageDataManager";
import TYPES from "../../../types";
import IPassageBusinessManager from "../IPassageBusinessManager";
import IWorkbookBusinessManager from "../IWorkbookBusinessManager";

@injectable()
class WorkbookPassageBusinessManager implements IWorkbookPassageBusinessManager {
    private _workbookPassageDataManager:IWorkbookPassageDataManager;
    private _passageBusinessManager:IPassageBusinessManager;

    constructor(
        @inject(TYPES.WorkbookPassageDataManager) workbookPassageDataManager:IWorkbookPassageDataManager,
        @inject(TYPES.PassageBusinessManager) passageBusinessManager:IPassageBusinessManager
    ){
        this._workbookPassageDataManager = workbookPassageDataManager;
        this._passageBusinessManager = passageBusinessManager;
    }

    copy(workbookId: string, newWorkbookId: string, ownerKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let workbookPassageCopy:any = {};
            this._workbookPassageDataManager
                .getMany(workbookId)
                .then( async (workbookPassages: any) => {
                    if(workbookPassages.length === 0 || workbookPassages[0]?.passages.length === 0) return null;
                    console.log('workbook passages to be cloned', workbookPassages)
                    workbookPassages[0]._id = newWorkbookId;
                    workbookPassageCopy = workbookPassages;
                    const allPassage = await this._passageBusinessManager.getMany(ownerKey);

                    // insert copied passages with new owner id
                    let copiedPassages = workbookPassages[0].passages.map((passage: any) => {
                        const existingOne = allPassage.find((ss:any) => ss.passage === passage.passage);
                        if(existingOne) {
                            return existingOne
                        }

                        passage.oldId = passage._id;
                        delete passage._id;

                        passage.ownerKey = ownerKey;

                        return this._passageBusinessManager.create(passage);
                    });

                    return await Promise.all(copiedPassages);

                })
                .then(copiedPassages => {
                    if(!copiedPassages) return null;

                    // match workbook passages with new copied passages
                    workbookPassageCopy[0].passages.forEach((copiedWorkbookPassage:any) => {
                        const matchedPassage: any = copiedPassages.find((copiedPassage:any) => {
                            // if this was copied from the same acccount use id instead of oldId
                            // const idField = copiedPassage.oldId || copiedPassage._id;
                            // return idField.toString() === copiedWorkbookPassage.passageId.toString()
                            return copiedPassage.passage === copiedWorkbookPassage.passage
                        });
                        copiedWorkbookPassage.passageId = matchedPassage ? matchedPassage._id : null;

                    });
                    return this._workbookPassageDataManager.clone(workbookPassageCopy[0]);

                })
                .then(() => {
                    resolve("OK")
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.workbookId || !data.passageId || !data.ownerKey) {
                return reject('Request body missing required parameters.');
            }

            this._passageBusinessManager.get(data.passageId)
                .then((result: any) => {
                    if(result === null) {
                        reject('Passage Does Not Exist');
                    }

                    return this._workbookPassageDataManager.create(data);
                })
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }
    clone(data: any): Promise<any> {
        return this._workbookPassageDataManager.clone(data)
    }

    delete(id: string): Promise<any> {
        return this._workbookPassageDataManager.delete(id);
    }

    modify(workbookId: string, id: string): Promise<any> {
        return this._workbookPassageDataManager.modify(workbookId, id);
    }

    get(id: string): Promise<any> {
        return this._workbookPassageDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._workbookPassageDataManager.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._workbookPassageDataManager.update(id, data);
    }

    deleteMany(passageId: string): Promise<any> {
        return this._workbookPassageDataManager.deleteMany(passageId);
    }

}

export {WorkbookPassageBusinessManager};
