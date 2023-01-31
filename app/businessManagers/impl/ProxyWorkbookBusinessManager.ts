import IProxyWorkbookBusinessManager from "../IProxyWorkbookBusinessManager";
import {inject, injectable} from "inversify";
import getDecorators from "inversify-inject-decorators";
import inversifyBaseConfig from '../../../inversify.base.config';
import IWorkbookDataManager from "../../dataManagers/IWorkbookDataManager";
import TYPES from "../../../types";
import IWorkbookSentenceBusinessManager from "../IWorkbookSentenceBusinessManager";
import IWorkbookPhraseBusinessManager from "../IWorkbookPhraseBusinessManager";
import IWorkbookPassageBusinessManager from "../IWorkbookPassageBusinessManager";
import IWorkbookFileBusinessManager from "../IWorkbookFileBusinessManager";
import {Errors} from "../../constants/Errors";

@injectable()
export default class ProxyWorkbookBusinessManager implements IProxyWorkbookBusinessManager {
    private _workbookDataManager: IWorkbookDataManager;
    private _workbookSentenceBusinessManager:IWorkbookSentenceBusinessManager;
    private _workbookPhraseBusinessManager:IWorkbookPhraseBusinessManager;
    private _workbookPassageBusinessManager:IWorkbookPassageBusinessManager;
    private _workbookFileBusinessManager:IWorkbookFileBusinessManager;

    constructor(
        @inject(TYPES.WorkbookDataManager) workbookDataManager:IWorkbookDataManager,
        @inject(TYPES.WorkbookSentenceBusinessManager) workbookSentenceBusinessManager:IWorkbookSentenceBusinessManager,
        @inject(TYPES.WorkbookPhraseBusinessManager) workbookPhraseBusinessManager:IWorkbookPhraseBusinessManager,
        @inject(TYPES.WorkbookPassageBusinessManager) workbookPassageBusinessManager:IWorkbookPassageBusinessManager,
        @inject(TYPES.WorkbookFileBusinessManager) workbookFileBusinessManager:IWorkbookFileBusinessManager,
    ) {
        this._workbookDataManager = workbookDataManager;
        this._workbookSentenceBusinessManager = workbookSentenceBusinessManager;
        this._workbookPassageBusinessManager = workbookPassageBusinessManager;
        this._workbookPhraseBusinessManager = workbookPhraseBusinessManager;
        this._workbookFileBusinessManager = workbookFileBusinessManager;
    }

    copy(workbookId: string, ownerKey: string, changeName: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            let newWorkbook:any;

            this._workbookDataManager
                .get(workbookId)
                .then((result: any) => {
                    if(!result) reject(Errors.notFound('Workbook'));

                    result.oldId = result._id;
                    delete result._id;
                    result.owner = ownerKey;
                    if(changeName){
                        result.name = `${result.name} (copy)`;
                    }

                    return this._workbookDataManager.create(result);
                })
                .then(workbookCopy => {
                    newWorkbook = workbookCopy;

                    return Promise.all([
                        this._workbookSentenceBusinessManager.copy(workbookId, workbookCopy._id, ownerKey),
                        this._workbookPhraseBusinessManager.copy(workbookId, workbookCopy._id, ownerKey),
                        this._workbookPassageBusinessManager.copy(workbookId, workbookCopy._id, ownerKey),
                        this._workbookFileBusinessManager.copy(workbookId, workbookCopy._id, ownerKey),
                    ]);
                })
                .then(() => {
                    resolve(newWorkbook)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }
}
