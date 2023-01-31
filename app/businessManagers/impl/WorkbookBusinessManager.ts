import {inject, injectable, LazyServiceIdentifer} from "inversify";
import getDecorators from "inversify-inject-decorators";
import inversifyBaseConfig from '../../../inversify.base.config';
import IWorkbookBusinessManager from "../IWorkbookBusinessManager";
import IWorkbookDataManager from "../../dataManagers/IWorkbookDataManager";
import TYPES from "../../../types";
import ILessonPlanStepDataManager from "../../dataManagers/ILessonPlanStepDataManager";
import ILessonPlanStepBusinessManager from "../ILessonPlanStepBusinessManager";
import ICourseWorkbookBusinessManager from "../ICourseWorkbookBusinessManager";
import ICourseBusinessManager from "../ICourseBusinessManager";
import {Errors} from "../../constants/Errors";
import IBundleContentBusinessManager from "../IBundleContentBusinessManager";
import IWorkbookSentenceBusinessManager from "../IWorkbookSentenceBusinessManager";
import IWorkbookPhraseBusinessManager from "../IWorkbookPhraseBusinessManager";
import IWorkbookPassageBusinessManager from "../IWorkbookPassageBusinessManager";
import IWorkbookFileBusinessManager from "../IWorkbookFileBusinessManager";
import {Pairings} from "../../constants/pairings";
import {DefaultUserSettings} from "../../constants/DefaultUserSettings";
import ICourseWorkbookActivityBusinessManager from "../ICourseWorkbookActivityBusinessManager";
import IProxyWorkbookBusinessManager from "../IProxyWorkbookBusinessManager";

@injectable()
class WorkbookBusinessManager implements IWorkbookBusinessManager {
    private _workbookDataManager:IWorkbookDataManager;
    private _lessonPlanStepBusinessManager:ILessonPlanStepDataManager;
    private _bundleContentBusinessManager:IBundleContentBusinessManager;
    private _courseWorkbookBusinessManager:ICourseWorkbookBusinessManager;
    private _courseWorkbookActivityBusinessManager:ICourseWorkbookActivityBusinessManager;
    private _proxyWorkbookBusinessManager:IProxyWorkbookBusinessManager;

    private _workbookSentenceBusinessManager:IWorkbookSentenceBusinessManager;
    private _workbookPhraseBusinessManager:IWorkbookPhraseBusinessManager;
    private _workbookPassageBusinessManager:IWorkbookPassageBusinessManager;
    private _workbookFileBusinessManager:IWorkbookFileBusinessManager;

    constructor(
        @inject(TYPES.WorkbookDataManager) workbookDataManager:IWorkbookDataManager,
        @inject(new LazyServiceIdentifer(() => TYPES.LessonPlanStepBusinessManager)) lessonPlanStepBusinessManager:ILessonPlanStepBusinessManager,
        @inject(TYPES.BundleContentBusinessManager) bundleContentBusinessManager:IBundleContentBusinessManager,
        @inject(TYPES.CourseWorkbookBusinessManager) courseWorkbookBusinessManager:ICourseWorkbookBusinessManager,
        @inject(TYPES.CourseWorkbookActivityBusinessManager) courseWorkbookActivityBusinessManager:ICourseWorkbookActivityBusinessManager,
        @inject(TYPES.ProxyWorkbookBusinessManager) proxyWorkbookBusinessManger:IProxyWorkbookBusinessManager,
        @inject(TYPES.WorkbookSentenceBusinessManager) workbookSentenceBusinessManager:IWorkbookSentenceBusinessManager,
        @inject(TYPES.WorkbookPhraseBusinessManager) workbookPhraseBusinessManager:IWorkbookPhraseBusinessManager,
        @inject(TYPES.WorkbookPassageBusinessManager) workbookPassageBusinessManager:IWorkbookPassageBusinessManager,
        @inject(TYPES.WorkbookFileBusinessManager) workbookFileBusinessManager:IWorkbookFileBusinessManager,
    ){
        this._workbookDataManager = workbookDataManager;
        this._lessonPlanStepBusinessManager = lessonPlanStepBusinessManager;
        this._bundleContentBusinessManager = bundleContentBusinessManager;
        this._courseWorkbookBusinessManager = courseWorkbookBusinessManager;
        this._courseWorkbookActivityBusinessManager = courseWorkbookActivityBusinessManager;
        this._proxyWorkbookBusinessManager = proxyWorkbookBusinessManger;
        this._workbookSentenceBusinessManager = workbookSentenceBusinessManager;
        this._workbookPassageBusinessManager = workbookPassageBusinessManager;
        this._workbookPhraseBusinessManager = workbookPhraseBusinessManager;
        this._workbookFileBusinessManager = workbookFileBusinessManager;
    }

    create(data: any): Promise<any> {
        //todo: generate tiles from exact words or exact tiles
        // data.
        console.log('filters', data.filters.exactWords)
        if ((data.filters.exactWords && data.filters.exactWords.length > 0)) {
            const sortedPreview: any[] = [];
            data.filters.exactWords.forEach((word: string) => {
                const wordData = data.preview.find((previewWord: any) => previewWord.word === word)
                sortedPreview.push(wordData)
            });
            data.preview = sortedPreview;
        }
        return this._workbookDataManager.create(data);
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let requests = [];
            // delete any workbook sentences
            requests.push(this._workbookSentenceBusinessManager.delete(id));

            // delete any workbook phrases associated with this workbook
            requests.push(this._workbookPhraseBusinessManager.delete(id));

            // delete any workbook passages associated with this workbook
            requests.push(this._workbookPassageBusinessManager.delete(id));

            // delete any workbook files associated with this workbook
            requests.push(this._workbookFileBusinessManager.delete(id));

            // delete any lesson plan steps that are using the course workbook
            requests.push(this._lessonPlanStepBusinessManager.deleteByWorkbookId(id));

            // delete this workbook from courses
            requests.push(this._courseWorkbookBusinessManager.deleteByWorkbookId(id));

            // delete bundle content using this workbook
            requests.push(this._bundleContentBusinessManager.deleteByContentId(id));

            // delete workbook
            Promise
                .all(requests)
                .then(results => this._workbookDataManager.delete(id))
                .then((result: any) => resolve('Workbook removed successfully'))
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        return this._workbookDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._workbookDataManager.getMany(id);
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
            if(data.owner) {
                delete data.owner;
            }
            let updatedWorkbook:any;
            this._workbookDataManager
                .update(id, data)
                .then((result: any) => {
                    updatedWorkbook = result;
                    return this._courseWorkbookActivityBusinessManager.updateByWorkbookId(id, {words: result.preview})
                })
                .then(() => resolve(updatedWorkbook))
                .catch((error: any) => reject(error));
        });
    }

    validateOwner(workbookId: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) =>  {
            if(locals.admin) {
                return resolve(null);
            }

            this._workbookDataManager
                .get(workbookId)
                .then((result: any) => {
                    if(!result || result.owner !== locals.userId) {
                        return reject(Errors.notAuthorized);
                    }

                    resolve('OK');
                })
        })
    }

    getManyById(ids: string[]): Promise<any> {
        return this._workbookDataManager.getManyById(ids);
    }

    copy(workbookId:string, ownerKey:string, changeName:boolean):Promise<any> {
        return this._proxyWorkbookBusinessManager.copy(workbookId, ownerKey,changeName);
    }

    getWorkbookLibrary(): Promise<any> {
        return this.getMany(process.env.LIBRARY_USER_ID);
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data.ownerKey = locals.userId;

            this.create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }
}

export {WorkbookBusinessManager};
