import IActivityBusinessManager from "../IActivityBusinessManager";
import WorkbookTilesInitRequest from "../../models/WorkbookTilesInitRequest";
import ICourseWorkbookBusinessManager from "../ICourseWorkbookBusinessManager";
import IActivityTypeBusinessManager from "../IActivityTypeBusinessManager";
import ICourseWorkbookActivityBusinessManager from "../ICourseWorkbookActivityBusinessManager";
import ICourseWorkbookActivityDataManager from "../../dataManagers/ICourseWorkbookActivityDataManager";
import ILessonPlanDataManager from "../../dataManagers/ILessonPlanDataManager";
import TYPES from "../../../types";
import {inject, injectable} from "inversify";
import {ActivityTypes} from "../../constants/ActivityTypes";
import IWordBusinessManager from "../IWordBusinessManager";
import BlackboardInitRequest from "../../models/blackboardInitRequest";
import IPaymentBusinessManager from "../IPaymentBusinessManager";
import blackboardInitRequest from "../../models/blackboardInitRequest";
import MiniTilesInitRequest from "../../models/MiniTilesInitRequest";
import ILessonPlanStepDataManager from "../../dataManagers/ILessonPlanStepDataManager";
import { WordBusinessManager } from "./WordBusinessManager";
@injectable()
export default class ActivityBusinessManager implements IActivityBusinessManager {
    private courseWorkbookDataManager:ICourseWorkbookBusinessManager;
    private activityTypesDataManager:IActivityTypeBusinessManager;
    private courseWorkbookActivityBusinessManager:ICourseWorkbookActivityBusinessManager;
    private lessonPlanStepDataManager:ILessonPlanStepDataManager;
    private wordBusinessManager:IWordBusinessManager;
    private paymentBusinessManager:IPaymentBusinessManager;

    constructor(
        @inject(TYPES.CourseWorkbookDataManager) courseWorkbookDataManager:ICourseWorkbookBusinessManager,
        @inject(TYPES.ActivityTypeDataManager) activityTypesDataManager:IActivityTypeBusinessManager,
        @inject(TYPES.CourseWorkbookActivityBusinessManager) courseWorkbookActivityBusinessManager:ICourseWorkbookActivityBusinessManager,
        @inject(TYPES.LessonPlanStepDataManager) lessonPlanStepDataManager:ILessonPlanStepDataManager,
        @inject(TYPES.WordBusinessManager) wordBusinessManager:IWordBusinessManager,
        @inject(TYPES.PaymentBusinessManager) paymentBusinessManager:IPaymentBusinessManager
    ) {
        this.activityTypesDataManager = activityTypesDataManager;
        this.courseWorkbookActivityBusinessManager = courseWorkbookActivityBusinessManager;
        this.courseWorkbookDataManager = courseWorkbookDataManager;
        this.lessonPlanStepDataManager = lessonPlanStepDataManager;
        this.wordBusinessManager = wordBusinessManager;
        this.paymentBusinessManager = paymentBusinessManager;
    }

    async workbookTilesInit(req: WorkbookTilesInitRequest): Promise<any> {
        let requests = [
            this.courseWorkbookDataManager.get(req.courseWorkbookId),
        ];
        if(req.lessonPlanStepId) {
            requests.push(this.lessonPlanStepDataManager.get(req.lessonPlanStepId));
        } else {
            requests.push(
                this.courseWorkbookActivityBusinessManager.getByCourseWorkbookAndActivityType(
                    req.courseWorkbookId,
                    ActivityTypes.workbookTiles._id)
            );
        }
        const [courseWorkbook, activityItem] = await Promise.all(requests);

        let response: any = {courseWorkbook};

        if(req.lessonPlanStepId) {
            response.lessonPlanStep = activityItem;
        } else {
            response.courseWorkbookActivity = activityItem;
            response.workbook = courseWorkbook.workbook;
        }

        const wordIds = activityItem.words
            .filter((word: any) => word)
            .map((word: any) => parseInt(word.wordid));
            
        let wordlist = courseWorkbook.fullWords
        let wordtiles: any[] = await this.wordBusinessManager.getTilesByWordIds(req.userId, wordIds, activityItem.affixTiles);
        response.wordlist = wordlist
        response.wordTiles = wordtiles;
        console.log('response complete', activityItem)
        return response;
    }

    async blackboardInit(req: BlackboardInitRequest): Promise<any> {
        console.log('blackboard init', req)

        let requests = [
            this.courseWorkbookDataManager.get(req.courseWorkbookId),
            this.paymentBusinessManager.getCustomer(req.customerId)
        ];
        if(req.lessonPlanStepId) {
            requests.push(this.lessonPlanStepDataManager.get(req.lessonPlanStepId));
        } else {
            requests.push(
                this.courseWorkbookActivityBusinessManager.getByCourseWorkbookAndActivityType(
                    req.courseWorkbookId,
                    ActivityTypes.blackboard._id)
            );
        }
        const [courseWorkbook, plan, activityItem] = await Promise.all(requests);

        let response: any = {courseWorkbook, plan};
        if(req.lessonPlanStepId) {
            response.lessonPlanStep = activityItem;
        } else {
            response.courseWorkbookActivity = activityItem;
        }

        const wordIds = activityItem.words
            .filter((word: any) => word)
            .map((word: any) => parseInt(word.wordid));

        let wordlist = courseWorkbook.fullWords
        let wordtiles: any[] = await this.wordBusinessManager.getTilesByWordIds(req.userId, wordIds, activityItem.affixTiles);
        response.wordTiles = wordtiles;
        response.wordlist = wordlist;
        console.log('response complete', activityItem)

        return response;
    }

    async miniTilesInit(req: MiniTilesInitRequest): Promise<any> {
        let requests = [
            this.courseWorkbookDataManager.get(req.courseWorkbookId),
        ];
        if(req.lessonPlanStepId) {
            requests.push(this.lessonPlanStepDataManager.get(req.lessonPlanStepId));
        } else {
            requests.push(
                this.courseWorkbookActivityBusinessManager.getByCourseWorkbookAndActivityType(
                    req.courseWorkbookId,
                    ActivityTypes.miniTiles._id
                )
            );
        }
        const [courseWorkbook, activityItem] = await Promise.all(requests);

        let response: any = {courseWorkbook};

        if(req.lessonPlanStepId) {
            response.lessonPlanStep = activityItem;
        } else {
            response.courseWorkbookActivity = activityItem;
        }

        const wordIds = activityItem.words
            .filter((word: any) => word)
            .map((word: any) => parseInt(word.wordid));
            
        let wordlist = courseWorkbook.fullWords
        let wordtiles: any[] = await this.wordBusinessManager.getTilesByWordIds(req.userId, wordIds, activityItem.affixTiles);


        response.wordlist = wordlist
        response.wordTiles = wordtiles;

        return response;
    }
}
