import {inject, injectable} from "inversify";
import getDecorators from "inversify-inject-decorators";
import inversifyBaseConfig from '../../../inversify.base.config';
import IWorkbookPhraseBusinessManager from "../IWorkbookPhraseBusinessManager";
import IWorkbookPhraseDataManager from "../../dataManagers/IWorkbookPhraseDataManager";
import TYPES from "../../../types";
import IWorkbookBusinessManager from "../IWorkbookBusinessManager";
import IPhraseBusinessManager from "../IPhraseBusinessManager";
import {workbookSentence} from "../../db";

@injectable()
class WorkbookPhraseBusinessManager implements IWorkbookPhraseBusinessManager {

    private _workbookPhraseDataManager:IWorkbookPhraseDataManager;
    private _phraseBusinessManager:IPhraseBusinessManager;

    constructor(
        @inject(TYPES.WorkbookPhraseDataManager) workbookPhraseDataManager:IWorkbookPhraseDataManager,
        @inject(TYPES.PhraseBusinessManager) phraseBusinessManager:IPhraseBusinessManager
    ){
        this._workbookPhraseDataManager = workbookPhraseDataManager;
        this._phraseBusinessManager = phraseBusinessManager
    }

    copy(workbookId: string, newWorkbookId: string, ownerKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let workbookPhraseCopy:any = {};
            this._workbookPhraseDataManager
                .getMany(workbookId)
                .then( async (workbookPhrases: any) => {
                    if(workbookPhrases.length === 0 || workbookPhrases[0]?.phrases.length === 0) return null;

                    // workbookPhrases = workbookPhrases.map((phrase:any) => {
                    //     delete phrase._id;
                    //     phrase.workbookId = newWorkbookId;

                    //     return phrase;
                    // });
                    workbookPhrases[0]._id = newWorkbookId;
                    workbookPhraseCopy = workbookPhrases;


                    // let requests:any[] = [];

                    // workbookPhrases.forEach((phrase:any) => {
                    //     requests.push(this._phraseBusinessManager.get(phrase.phraseId));
                    // });
                    // console.log('workbook phrases', workbookPhrases)
                    // console.log('request', requests)
                    // return Promise.all(requests);
                    if (workbookPhrases[0]?.ownerKey === ownerKey) {
                        return Promise.resolve(workbookPhrases);
                    }

                    const allPhrases = await this._phraseBusinessManager.getMany(ownerKey)
                    // insert copied phrases with new owner id
                    let copiedPhrasesRequest = workbookPhrases[0].phrases.map((phrase: any) => {
                        const existingOne = allPhrases.find((ss:any) => ss.phrase === phrase.phrase);
                        if(existingOne) {
                            return existingOne
                        }

                        phrase.oldId = phrase._id;
                        delete phrase._id;

                        phrase.ownerKey = ownerKey;

                        return this._phraseBusinessManager.create(phrase);
                    });

                    return await Promise.all(copiedPhrasesRequest);

                })
                .then(copiedPhrases => {
                    if(!copiedPhrases) return null;

                    // match workbook phrases with new copied phrases
                     workbookPhraseCopy[0].phrases.forEach((copiedWorkbookPhrase:any) => {
                        const matchedPhrase: any = copiedPhrases.find((copiedPhrase:any) => {
                            // if this was copied from the same acccount use id instead of oldId
                            // const idField = copiedPhrase.oldId || copiedPhrase._id;
                            // return idField.toString() === copiedWorkbookPhrase.phraseId.toString();
                            return copiedPhrase.phrase === copiedWorkbookPhrase.phrase
                        });
                        copiedWorkbookPhrase.phraseId = matchedPhrase ? matchedPhrase._id : null;
                    });

                        return this._workbookPhraseDataManager.clone(workbookPhraseCopy[0]);

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
            if(!data.workbookId || !data.phraseId || !data.ownerKey) {
                return reject('Request body missing required parameters.');
            }

            this._phraseBusinessManager.get(data.phraseId)
                .then((result: any) => {
                    if(result === null) {
                        reject('Phrase Does Not Exist');
                    }

                    return this._workbookPhraseDataManager.create(data);
                })
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }
    clone(data: any): Promise<any> {
        return this._workbookPhraseDataManager.clone(data)
    }
    delete(id: string): Promise<any> {
        return this._workbookPhraseDataManager.delete(id);
    }
    modify(workbookId: string, id: string): Promise<any> {
        return this._workbookPhraseDataManager.modify(workbookId, id);
    }

    get(id: string): Promise<any> {
        return this._workbookPhraseDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._workbookPhraseDataManager.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._workbookPhraseDataManager.update(id, data);
    }

    deleteMany(phraseId: string): Promise<any> {
        return this._workbookPhraseDataManager.delete(phraseId);
    }

}

export {WorkbookPhraseBusinessManager};
