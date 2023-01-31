import {inject, injectable} from "inversify";
import getDecorators from "inversify-inject-decorators";
import inversifyBaseConfig from '../../../inversify.base.config';
import IWorkbookSentenceBusinessManager from "../IWorkbookSentenceBusinessManager";
import IWorkbookSentenceDataManager from "../../dataManagers/IWorkbookSentenceDataManager";
import TYPES from "../../../types";
import IWorkbookBusinessManager from "../IWorkbookBusinessManager";
import ISentenceBusinessManager from "../ISentenceBusinessManager";

@injectable()
class WorkbookSentenceBusinessManager implements IWorkbookSentenceBusinessManager {
    private _workbookSentenceDataManager:IWorkbookSentenceDataManager;
    private _sentenceBusinessManager:ISentenceBusinessManager;

    constructor(
        @inject(TYPES.WorkbookSentenceDataManager) workbookSentenceDataManager:IWorkbookSentenceDataManager,
        @inject(TYPES.SentenceBusinessManager) sentenceBusinessManager:ISentenceBusinessManager
    ){
        this._workbookSentenceDataManager = workbookSentenceDataManager;
        this._sentenceBusinessManager = sentenceBusinessManager;
    }

    copy(workbookId: string, newWorkbookId: string, ownerKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let workbookSentenceCopy:any = {};
            this._workbookSentenceDataManager
                .getMany(workbookId)
                .then(async (workbookSentences: any) => {
                    if(workbookSentences.length === 0 || workbookSentences[0]?.sentences.length === 0) return null;

                    workbookSentences[0]._id = newWorkbookId;
                    workbookSentenceCopy = workbookSentences;

                    
                    if (workbookSentences[0]?.ownerKey === ownerKey) {
                        return Promise.resolve(workbookSentences);
                    }

                    const allSentences = await this._sentenceBusinessManager.getMany(ownerKey);
                    // insert copied sentences with new owner id
                    let copiedSentencesRequests = workbookSentences[0].sentences.map((sentence: any) => {
                        const existingOne = allSentences.find((ss:any) => ss.sentence === sentence.sentence);
                        if(existingOne) {
                            return existingOne
                        }

                        sentence.oldId = sentence._id;
                        delete sentence._id;

                        sentence.ownerKey = ownerKey;

                        return this._sentenceBusinessManager.create(sentence);
                    });

                    return await Promise.all(copiedSentencesRequests);
                })
                .then((copiedSentences: any) => {
                    if(!copiedSentences) return null;

                    // match workbook sentences with new copied sentences
                    workbookSentenceCopy[0].sentences.forEach((copiedWorkbookSentence:any) => {
                        const matchedSentence = copiedSentences.find((copiedSentence:any) => {
                            // if this was copied from the same account use id instead of oldId
                            // const idField = copiedSentence.oldId || copiedSentence._id;
                            // return idField.toString() === copiedWorkbookSentence.sentenceId.toString();
                            return copiedSentence.sentence === copiedWorkbookSentence.sentence
                        });
                        copiedWorkbookSentence.sentenceId = matchedSentence ? matchedSentence._id : null;
                    });
                    return this._workbookSentenceDataManager.clone(workbookSentenceCopy[0]);
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
            if(!data.workbookId || !data.sentenceId || !data.ownerKey) {
                return reject('Request body missing required parameters.');
            }

           this._sentenceBusinessManager.get(data.sentenceId)
                .then((result: any) => {
                    if(result === null) {
                        reject('Sentence Does Not Exist');
                    }

                    return this._workbookSentenceDataManager.create(data);
                })
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }
    clone(data: any): Promise<any> {
        return this._workbookSentenceDataManager.clone(data)
    }
    delete(id: string): Promise<any> {
        return this._workbookSentenceDataManager.delete(id);
    }
    modify(workbookId: string, id: string): Promise<any> {
        return this._workbookSentenceDataManager.modify(workbookId, id);
    }

    get(id: string): Promise<any> {
        return this._workbookSentenceDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._workbookSentenceDataManager.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._workbookSentenceDataManager.update(id, data);
    }

    deleteMany(sentenceId: string): Promise<any> {
        return this._workbookSentenceDataManager.deleteMany(sentenceId);
    }

}

export {WorkbookSentenceBusinessManager};
