import { Container } from "inversify";
import "reflect-metadata";
import TYPES from "./types";

import IAccIndexBusinessManager  from './app/businessManagers/IAccIndexBusinessManager';
import IAccountTypeBusinessManager  from './app/businessManagers/IAccountTypeBusinessManager';
import IBundleBusinessManager from './app/businessManagers/IBundleBusinessManager';
import IBundleContentBusinessManager from './app/businessManagers/IBundleContentBusinessManager';
import IBundleQueueBusinessManager from './app/businessManagers/IBundleQueueBusinessManager';
import ICourseBusinessManager from './app/businessManagers/ICourseBusinessManager';
import ICourseWorkbookBusinessManager from './app/businessManagers/ICourseWorkbookBusinessManager';
import IFileBusinessManager from './app/businessManagers/IFileBusinessManager';
import ILessonPlanBusinessManager from "./app/businessManagers/ILessonPlanBusinessManager";
import ILessonPlanStepBusinessManager from "./app/businessManagers/ILessonPlanStepBusinessManager";
import IPassageBusinessManager from "./app/businessManagers/IPassageBusinessManager";
import IPaymentBusinessManager from './app/businessManagers/IPaymentBusinessManager';
import IPhraseBusinessManager from './app/businessManagers/IPhraseBusinessManager';
import IRegistrationBusinessManager from './app/businessManagers/IRegistrationBusinessManager';
import ISecurityBusinessManager from './app/businessManagers/ISecurityBusinessManager';
import ISentenceBusinessManager from './app/businessManagers/ISentenceBusinessManager';
import ISocialMediaBusinessManager from './app/businessManagers/ISocialMediaBusinessManager';
import IStudentBusinessManager from './app/businessManagers/IStudentBusinessManager';
import IUserBusinessManager from './app/businessManagers/IUserBusinessManager';
import IUserSettingsBusinessManager from './app/businessManagers/IUserSettingsBusinessManager';
import IUserActivitySettingsBusinessManager from './app/businessManagers/IUserActivitySettingsBusinessManager';
import IWordBusinessManager from './app/businessManagers/IWordBusinessManager';
import IWorkbookBusinessManager from './app/businessManagers/IWorkbookBusinessManager';
import IWorkbookFileBusinessManager from './app/businessManagers/IWorkbookFileBusinessManager';
import IWorkbookPassageBusinessManager from './app/businessManagers/IWorkbookPassageBusinessManager';
import IWorkbookPhraseBusinessManager from './app/businessManagers/IWorkbookPhraseBusinessManager';
import IWorkbookSentenceBusinessManager from './app/businessManagers/IWorkbookSentenceBusinessManager';

import { AccIndexBusinessManager } from './app/businessManagers/impl/AccIndexBusinessManager';
import { BundleBusinessManager } from './app/businessManagers/impl/BundleBusinessManager';
import { BundleContentBusinessManager } from './app/businessManagers/impl/BundleContentBusinessManager';
import { BundleQueueBusinessManager } from './app/businessManagers/impl/BundleQueueBusinessManager';
import { CourseBusinessManager } from './app/businessManagers/impl/CourseBusinessManager';
import { CourseWorkbookBusinessManager } from './app/businessManagers/impl/CourseWorkbookBusinessManager';
import { FileBusinessManager } from './app/businessManagers/impl/FileBusinessManager';
import { LessonPlanBusinessManager } from "./app/businessManagers/impl/LessonPlanBusinessManager";
import { LessonPlanStepBusinessManager } from "./app/businessManagers/impl/LessonPlanStepBusinessManager";
import { PassageBusinessManager } from './app/businessManagers/impl/PassageBusinessManager';
import { PaymentBusinessManager } from './app/businessManagers/impl/PaymentBusinessManager';
import { PhraseBusinessManager } from './app/businessManagers/impl/PhraseBusinessManager';
import { RegistrationBusinessManager } from './app/businessManagers/impl/RegistrationBusinessManager';
import { SecurityBusinessManager } from './app/businessManagers/impl/SecurityBusinessManager';
import { SentenceBusinessManager } from './app/businessManagers/impl/SentenceBusinessManager';
import { SocialMediaBusinessManager } from './app/businessManagers/impl/SocialMediaBusinessManager';
import { StudentBusinessManager } from './app/businessManagers/impl/StudentBusinessManager';
import { UserBusinessManager } from './app/businessManagers/impl/UserBusinessManager';
import { UserSettingsBusinessManager } from './app/businessManagers/impl/UserSettingsBusinessManager';
import { UserActivitySettingsBusinessManager } from './app/businessManagers/impl/UserActivitySettingsBusinessManager';
import { WordBusinessManager } from "./app/businessManagers/impl/WordBusinessManager";
import { WorkbookBusinessManager} from "./app/businessManagers/impl/WorkbookBusinessManager";
import { WorkbookFileBusinessManager } from "./app/businessManagers/impl/WorkbookFileBusinessManager";
import { WorkbookPassageBusinessManager } from "./app/businessManagers/impl/WorkbookPassageBusinessManager";
import { WorkbookPhraseBusinessManager } from "./app/businessManagers/impl/WorkbookPhraseBusinessManager";
import { WorkbookSentenceBusinessManager } from "./app/businessManagers/impl/WorkbookSentenceBusinessManager";

import IAccIndexDataManager  from './app/dataManagers/IAccIndexDataManager';
import IBundleDataManager from './app/dataManagers/IBundleDataManager';
import IBundleContentDataManager from './app/dataManagers/IBundleDataManager';
import IBundleQueueDataManager from './app/dataManagers/IBundleQueueDataManager';
import ICourseDataManager from './app/dataManagers/ICourseDataManager';
import ICourseWorkbookDataManager from './app/dataManagers/ICourseWorkbookDataManager';
import IFileDataManager from './app/dataManagers/IFileDataManager';
import ILessonPlanDataManager from "./app/dataManagers/ILessonPlanDataManager";
import ILessonPlanStepDataManager from "./app/dataManagers/ILessonPlanStepDataManager";
import IPassageDataManager from "./app/dataManagers/IPassageDataManager";
import IPaymentDataManager from './app/dataManagers/IPaymentDataManager';
import IPhraseDataManager from './app/dataManagers/IPhraseDataManager';
import IRegistrationDataManager from './app/dataManagers/IRegistrationDataManager';
import ISecurityDataManager from './app/dataManagers/ISecurityDataManager';
import ISentenceDataManager from './app/dataManagers/ISentenceDataManager';
import ISocialMediaDataManager from './app/dataManagers/ISocialMediaDataManager';
import IStudentDataManager from './app/dataManagers/IStudentDataManager';
import IUserDataManager from './app/dataManagers/IUserDataManager';
import IUserSettingsDataManager from './app/dataManagers/IUserSettingsDataManager';
import IUserActivitySettingsDataManager from './app/dataManagers/IUserActivitySettingsDataManager';
import IWordDataManager from './app/dataManagers/IWordDataManager';
import IWorkbookDataManager from './app/dataManagers/IWorkbookDataManager';
import IWorkbookFileDataManager from './app/dataManagers/IWorkbookFileDataManager';
import IWorkbookPassageDataManager from './app/dataManagers/IWorkbookPassageDataManager';
import IWorkbookPhraseDataManager from './app/dataManagers/IWorkbookPhraseDataManager';
import IWorkbookSentenceDataManager from './app/dataManagers/IWorkbookSentenceDataManager';

import { AccIndexDataManager } from './app/dataManagers/impl/AccIndexDataManager';
import {AccountTypeBusinessManager} from "./app/businessManagers/impl/AccountTypeBusinessManager";
import { BundleContentDataManager } from "./app/dataManagers/impl/BundleContentDataManager";
import { BundleDataManager } from "./app/dataManagers/impl/BundleDataManager";
import { BundleQueueDataManager } from "./app/dataManagers/impl/BundleQueueDataManager";
import { CourseDataManager } from './app/dataManagers/impl/CourseDataManager';
import { CourseWorkbookDataManager } from "./app/dataManagers/impl/CourseWorkbookDataManager";
import { FileDataManager } from "./app/dataManagers/impl/FileDataManager";
import { LessonPlanDataManager } from './app/dataManagers/impl/LessonPlanDataManager';
import { LessonPlanStepDataManager } from "./app/dataManagers/impl/LessonPlanStepDataManager";
import { PassageDataManager } from "./app/dataManagers/impl/PassageDataManager";
import { PaymentDataManager } from './app/dataManagers/impl/PaymentDataManager';
import { PhraseDataManager } from "./app/dataManagers/impl/PhraseDataManager";
import { RegistrationDataManager } from './app/dataManagers/impl/RegistrationDataManager';
import { SecurityDataManager } from './app/dataManagers/impl/SecurityDataManager';
import { SentenceDataManager } from "./app/dataManagers/impl/SentenceDataManager";
import { SocialMediaDataManager } from './app/dataManagers/impl/SocialMediaDataManager';
import { StudentDataManager } from './app/dataManagers/impl/StudentDataManager';
import { UserDataManager } from './app/dataManagers/impl/UserDataManager';
import { UserSettingsDataManager } from './app/dataManagers/impl/UserSettingsDataManager';
import { UserActivitySettingsDataManager } from './app/dataManagers/impl/UserActivitySettingsDataManager';
import { WordDataManager } from "./app/dataManagers/impl/WordDataManager";
import { WorkbookDataManager } from "./app/dataManagers/impl/WorkbookDataManager";
import { WorkbookFileDataManager } from "./app/dataManagers/impl/WorkbookFileDataManager";
import { WorkbookPassageDataManager } from "./app/dataManagers/impl/WorkbookPassageDataManager";
import { WorkbookPhraseDataManager } from "./app/dataManagers/impl/WorkbookPhraseDataManager";
import { WorkbookSentenceDataManager } from "./app/dataManagers/impl/WorkbookSentenceDataManager";

import IAccIndexMongoDao  from './app/dataObjects/IAccIndexMongoDao';
import IBundleContentMongoDao from './app/dataObjects/IBundleContentMongoDao';
import IBundleMongoDao from './app/dataObjects/IBundleMongoDao';
import IBundleQueueMongoDao from './app/dataObjects/IBundleQueueMongoDao';
import ICourseMongoDao from './app/dataObjects/ICourseMongoDao';
import ICourseWorkbookMongoDao from './app/dataObjects/ICourseWorkbookMongoDao';
import IFileMongoDao from './app/dataObjects/IFileMongoDao';
import ILessonPlanMongoDao from "./app/dataObjects/ILessonPlanMongoDao";
import ILessonPlanStepMongoDao from "./app/dataObjects/ILessonPlanStepMongoDao";
import IPassageMongoDao from './app/dataObjects/IPassageMongoDao';
import IPaymentStripeDao from './app/dataObjects/IPaymentStripeDao';
import IPhraseMongoDao from './app/dataObjects/IPhraseMongoDao';
import IRegistrationMongoDao from './app/dataObjects/IRegistrationMongoDao';
import ISecurityAuth0Dao from './app/dataObjects/ISecurityAuth0Dao';
import ISentenceMongoDao from './app/dataObjects/ISentenceMongoDao';
import ISocialMediaSlackDao from './app/dataObjects/ISocialMediaSlackDao';
import IStudentMongoDao from './app/dataObjects/IStudentMongoDao';
import IUserMongoDao from './app/dataObjects/IUserMongoDao';
import IUserSettingsMongoDao from './app/dataObjects/IUserSettingsMongoDao';
import IUserActivitySettingsMongoDao from './app/dataObjects/IUserActivitySettingsMongoDao';
import IWordMongoDao from './app/dataObjects/IWordMongoDao';
import IWorkbookMongoDao from './app/dataObjects/IWorkbookMongoDao';
import IWorkbookFileMongoDao from './app/dataObjects/IWorkbookFileMongoDao';
import IWorkbookPassageMongoDao from './app/dataObjects/IWorkbookPassageMongoDao';
import IWorkbookPhraseMongoDao from './app/dataObjects/IWorkbookPhraseMongoDao';
import IWorkbookSentenceMongoDao from './app/dataObjects/IWorkbookSentenceMongoDao';

import { AccIndexMongoDao } from './app/dataObjects/impl/AccIndexMongoDao';
import { BundleContentMongoDao } from "./app/dataObjects/impl/BundleContentMongoDao";
import { BundleMongoDao } from "./app/dataObjects/impl/BundleMongoDao";
import { BundleQueueMongoDao } from "./app/dataObjects/impl/BundleQueueMongoDao";
import { CourseMongoDao } from './app/dataObjects/impl/CourseMongoDao';
import { CourseWorkbookMongoDao } from "./app/dataObjects/impl/CourseWorkbookMongoDao";
import { FileMongoDao } from "./app/dataObjects/impl/FileMongoDao";
import { LessonPlanMongoDao } from "./app/dataObjects/impl/LessonPlanMongoDao";
import { LessonPlanStepMongoDao } from "./app/dataObjects/impl/LessonPlanStepMongoDao";
import { PassageMongoDao } from "./app/dataObjects/impl/PassageMongoDao";
import { PaymentStripeDao } from './app/dataObjects/impl/PaymentStripeDao';
import { PhraseMongoDao } from "./app/dataObjects/impl/PhraseMongoDao";
import { RegistrationMongoDao } from './app/dataObjects/impl/RegistrationMongoDao';
import { SecurityAuth0Dao } from './app/dataObjects/impl/SecurityAuth0Dao';
import { SentenceMongoDao } from "./app/dataObjects/impl/SentenceMongoDao";
import { SocialMediaSlackDao } from './app/dataObjects/impl/SocialMediaSlackDao';
import { StudentMongoDao } from './app/dataObjects/impl/StudentMongoDao';
import { UserMongoDao } from './app/dataObjects/impl/UserMongoDao';
import { UserSettingsMongoDao } from './app/dataObjects/impl/UserSettingsMongoDao';
import { UserActivitySettingsMongoDao } from './app/dataObjects/impl/UserActivitySettingsMongoDao';
import { WordMongoDao } from "./app/dataObjects/impl/WordMongoDao";
import { WorkbookMongoDao } from "./app/dataObjects/impl/WorkbookMongoDao";
import { WorkbookFileMongoDao } from "./app/dataObjects/impl/WorkbookFileMongoDao";
import { WorkbookPassageMongoDao } from "./app/dataObjects/impl/WorkbookPassageMongoDao";
import { WorkbookPhraseMongoDao } from "./app/dataObjects/impl/WorkbookPhraseMongoDao";
import { WorkbookSentenceMongoDao} from "./app/dataObjects/impl/WorkbookSentenceMongoDao";
import IAccIndexBase from "./app/shared/IAccIndexBase";
import IBundleBase from "./app/shared/IBundleBase";
import IUserBase from "./app/shared/IUserBase";
import IBundleContentBase from "./app/shared/IBundleContentBase";
import ICourseBase from "./app/shared/ICourseBase";
import ICourseWorkbookBase from "./app/shared/ICourseWorkbookBase";
import IBundleQueueBase from "./app/shared/IBundleQueueBase";
import IWorkbookBase from "./app/shared/IWorkbookBase";
import {FileGCloudDao} from "./app/dataObjects/impl/FileGCloudDao";
import IFileBase from "./app/shared/IFileBase";
import ILessonPlanBase from "./app/shared/ILessonPlanBase";
import ILessonPlanStepBase from "./app/shared/ILessonPlanStepBase";
import IPassageBase from "./app/shared/IPassageBase";
import IPaymentBase from "./app/shared/IPaymentBase";
import IPhraseBase from "./app/shared/IPhraseBase";
import ISecurityBase from "./app/shared/ISecurityBase";
import ISentenceBase from "./app/shared/ISentenceBase";
import ISocialMediaBase from "./app/shared/ISocialMediaBase";
import IStudentBase from "./app/shared/IStudentBase";
import IUserSettingsBase from "./app/shared/IUserSettingsBase";
import IUserActivitySettingsBase from './app/shared/IUserActivitySettingsBase';
import IWordBase from "./app/shared/IWordBase";
import IAccountTypeDataManager from "./app/dataManagers/IAccountTypeDataManager";
import {AccountTypeDataManager} from "./app/dataManagers/impl/AccountTypeDataManager";
import IAccountTypeBase from "./app/shared/IAccountTypeBase";
import {AccountTypeMongoDao} from "./app/dataObjects/impl/AccountTypeMongoDao";
import ITileBankBusinessManager from "./app/businessManagers/ITileBankBusinessManager";
import {TileBankBusinessManager} from "./app/businessManagers/impl/TileBankBusinessManager";
import ITileBankDataManager from "./app/dataManagers/ITileBankDataManager";
import {TileBankDataManager} from "./app/dataManagers/impl/TileBankDataManager";
import ITileBankBase from "./app/shared/ITileBankBase";
import {TileBankMongoDao} from "./app/dataObjects/impl/TileBankMongoDao";
import IActivityTypeBusinessManager from "./app/businessManagers/IActivityTypeBusinessManager";
import {ActivityTypeBusinessManager} from "./app/businessManagers/impl/ActivityTypeBusinessManager";
import IActivityTypeDataManager from "./app/dataManagers/IActivityTypeDataManager";
import {ActivityTypeDataManager} from "./app/dataManagers/impl/ActivityTypeDataManager";
import IActivityTypeBase from "./app/shared/IActivityTypeBase";
import {ActivityTypeMongoDao} from "./app/dataObjects/impl/ActivityTypeMongoDao";
import {SecurityMongoDao} from "./app/dataObjects/impl/SecurityMongoDao";
import ISecurityMongoDao from "./app/dataObjects/ISecurityMongoDao";
import ISoundLetterPairingsBusinessManager from "./app/businessManagers/ISoundLetterPairingsBusinessManager";
import {SoundLetterPairingsBusinessManager} from "./app/businessManagers/impl/SoundLetterPairingsBusinessManager";
import ISoundLetterPairingsDataManager from "./app/dataManagers/ISoundLetterPairingsDataManager";
import {SoundLetterPairingsDataManager} from "./app/dataManagers/impl/SoundLetterPairingsDataManager";
import ISoundLetterPairingsJsDao from "./app/dataObjects/ISoundLetterPairingsJsDao";
import {SoundLetterPairingsJsDao} from "./app/dataObjects/impl/SoundLetterPairingsJsDao";
import ITilesBusinessManager from "./app/businessManagers/ITilesBusinessManager";
import {TilesBusinessManager} from "./app/businessManagers/impl/TilesBusinessManager";
import {TilesDataManager} from "./app/dataManagers/impl/TilesDataManager";
import ITilesDataManager from "./app/dataManagers/ITilesDataManager";
import {TilesJsDao} from "./app/dataObjects/impl/TilesJsDao";
import ITilesBase from "./app/shared/ITilesBase";
import {FileFSDao} from "./app/dataObjects/impl/FileFSDao";
import {PairingsBusinessManager} from "./app/businessManagers/impl/PairingsBusinessManager";
import IPairingsBusinessManager from "./app/businessManagers/IPairingsBusinessManager";
import {PairingsDataManager} from "./app/dataManagers/impl/PairingsDataManager";
import IPairingsDataManager from "./app/dataManagers/IPairingsDataManager";
import IPlanBusinessManager from "./app/businessManagers/IPlanBusinessManager";
import {PlanBusinessManager} from "./app/businessManagers/impl/PlanBusinessManager";
import {PlanDataManager} from "./app/dataManagers/impl/PlanDataManager";
import IPlanDataManager from "./app/dataManagers/IPlanDataManager";
import ICourseWorkbookActivityBusinessManager from "./app/businessManagers/ICourseWorkbookActivityBusinessManager";
import {CourseWorkbookActivityBusinessManager} from "./app/businessManagers/impl/CourseWorkbookActivityBusinessManager";
import ICourseWorkbookActivityDataManager from "./app/dataManagers/ICourseWorkbookActivityDataManager";
import {CourseWorkbookActivityDataManager} from "./app/dataManagers/impl/CourseWorkbookActivityDataManager";
import ISubscriptionBusinessManager from "./app/businessManagers/ISubscriptionBusinessManager";
import {SubscriptionBusinessManager} from "./app/businessManagers/impl/SubscriptionBusinessManager";
import ISubscriptionDataManager from "./app/dataManagers/ISubscriptionDataManager";
import {SubscriptionDataManager} from "./app/dataManagers/impl/SubscriptionDataManager";
import IProxyWorkbookBusinessManager from "./app/businessManagers/IProxyWorkbookBusinessManager";
import ProxyWorkbookBusinessManager from "./app/businessManagers/impl/ProxyWorkbookBusinessManager";
import ISettingsBusinessManager from "./app/businessManagers/ISettingsBusinessManager";
import SettingsBusinessManager from "./app/businessManagers/impl/SettingsBusinessManager";
import SettingsDataManager from "./app/dataManagers/impl/SettingsDataManager";
import ISettingsDataManager from "./app/dataManagers/ISettingsDataManager";
import IActivityBusinessManager from "./app/businessManagers/IActivityBusinessManager";
import ActivityBusinessManager from "./app/businessManagers/impl/ActivityBusinessManager";
import ICourseWorkbookActivityMongoDao from "./app/dataObjects/ICourseWorkbookActivityMongoDao";
import {CourseWorkbookActivityMongoDao} from "./app/dataObjects/impl/CourseWorkbookActivityMongoDao";
import IPairingsBase from "./app/shared/IPairingsBase";
import {PairingsJsDao} from "./app/dataObjects/impl/PairingsJsDao";
import IPlanBase from "./app/shared/IPlanBase";
import {PlanMongoDao} from "./app/dataObjects/impl/PlanMongoDao";
import ISettingsMongoDao from "./app/dataObjects/ISettingsMongoDao";
import {SettingsMongoDao} from "./app/dataObjects/impl/SettingsMongoDao";
import ISubscriptionBase from "./app/shared/ISubscriptionBase";
import {SubscriptionMongoDao} from "./app/dataObjects/impl/SubscriptionMongoDao";
import { VersionBusinessManager } from './app/businessManagers/impl/VersionBusinessManager';
import IVersionMongoDao from "./app/dataObjects/IVersionMongoDao";
import { VersionMongoDao } from "./app/dataObjects/impl/VersionMongoDao";
import IVersionBusinessManager from "./app/businessManagers/IVersionBusinessManager";
import IVersionDataManager from "./app/dataManagers/IVersionDataManager";
import { VersionDataManager } from "./app/dataManagers/impl/VersionDataManager";

const inversifyBaseConfig = new Container();

//Business managers
inversifyBaseConfig.bind<IAccIndexBusinessManager>(TYPES.AccIndexBusinessManager).to(AccIndexBusinessManager);
inversifyBaseConfig.bind<IAccountTypeBusinessManager>(TYPES.AccountTypeBusinessManager).to(AccountTypeBusinessManager);
inversifyBaseConfig.bind<IActivityBusinessManager>(TYPES.ActivityBusinessManager).to(ActivityBusinessManager);
inversifyBaseConfig.bind<IActivityTypeBusinessManager>(TYPES.ActivityTypeBusinessManager).to(ActivityTypeBusinessManager);
inversifyBaseConfig.bind<IBundleContentBusinessManager>(TYPES.BundleContentBusinessManager).to(BundleContentBusinessManager);
inversifyBaseConfig.bind<IBundleBusinessManager>(TYPES.BundleBusinessManager).to(BundleBusinessManager);
inversifyBaseConfig.bind<IBundleQueueBusinessManager>(TYPES.BundleQueueBusinessManager).to(BundleQueueBusinessManager);
inversifyBaseConfig.bind<ICourseBusinessManager>(TYPES.CourseBusinessManager).to(CourseBusinessManager);
inversifyBaseConfig.bind<ICourseWorkbookBusinessManager>(TYPES.CourseWorkbookBusinessManager).to(CourseWorkbookBusinessManager);
inversifyBaseConfig.bind<ICourseWorkbookActivityBusinessManager>(TYPES.CourseWorkbookActivityBusinessManager).to(CourseWorkbookActivityBusinessManager);
inversifyBaseConfig.bind<IFileBusinessManager>(TYPES.FileBusinessManager).to(FileBusinessManager);
inversifyBaseConfig.bind<ILessonPlanBusinessManager>(TYPES.LessonPlanBusinessManager).to(LessonPlanBusinessManager);
inversifyBaseConfig.bind<ILessonPlanStepBusinessManager>(TYPES.LessonPlanStepBusinessManager).to(LessonPlanStepBusinessManager);
inversifyBaseConfig.bind<IPairingsBusinessManager>(TYPES.PairingsBusinessManager).to(PairingsBusinessManager);
inversifyBaseConfig.bind<IPassageBusinessManager>(TYPES.PassageBusinessManager).to(PassageBusinessManager);
inversifyBaseConfig.bind<IPaymentBusinessManager>(TYPES.PaymentBusinessManager).to(PaymentBusinessManager);
inversifyBaseConfig.bind<IPhraseBusinessManager>(TYPES.PhraseBusinessManager).to(PhraseBusinessManager);
inversifyBaseConfig.bind<IPlanBusinessManager>(TYPES.PlanBusinessManager).to(PlanBusinessManager);
inversifyBaseConfig.bind<IProxyWorkbookBusinessManager>(TYPES.ProxyWorkbookBusinessManager).to(ProxyWorkbookBusinessManager);
inversifyBaseConfig.bind<IRegistrationBusinessManager>(TYPES.RegistrationBusinessManager).to(RegistrationBusinessManager);
inversifyBaseConfig.bind<ISecurityBusinessManager>(TYPES.SecurityBusinessManager).to(SecurityBusinessManager);
inversifyBaseConfig.bind<ISentenceBusinessManager>(TYPES.SentenceBusinessManager).to(SentenceBusinessManager);
inversifyBaseConfig.bind<ISettingsBusinessManager>(TYPES.SettingsBusinessManager).to(SettingsBusinessManager);
inversifyBaseConfig.bind<ISocialMediaBusinessManager>(TYPES.SocialMediaBusinessManager).to(SocialMediaBusinessManager);
inversifyBaseConfig.bind<ISoundLetterPairingsBusinessManager>(TYPES.SoundLetterPairingsBusinessManager).to(SoundLetterPairingsBusinessManager);
inversifyBaseConfig.bind<IStudentBusinessManager>(TYPES.StudentBusinessManager).to(StudentBusinessManager);
inversifyBaseConfig.bind<ISubscriptionBusinessManager>(TYPES.SubscriptionBusinessManager).to(SubscriptionBusinessManager);
inversifyBaseConfig.bind<ITileBankBusinessManager>(TYPES.TileBankBusinessManager).to(TileBankBusinessManager);
inversifyBaseConfig.bind<ITilesBusinessManager>(TYPES.TilesBusinessManager).to(TilesBusinessManager);
inversifyBaseConfig.bind<IUserBusinessManager>(TYPES.UserBusinessManager).to(UserBusinessManager);
inversifyBaseConfig.bind<IUserSettingsBusinessManager>(TYPES.UserSettingsBusinessManager).to(UserSettingsBusinessManager);
inversifyBaseConfig.bind<IUserActivitySettingsBusinessManager>(TYPES.UserActivitySettingsBusinessManager).to(UserActivitySettingsBusinessManager);
inversifyBaseConfig.bind<IWordBusinessManager>(TYPES.WordBusinessManager).to(WordBusinessManager);
inversifyBaseConfig.bind<IWorkbookBusinessManager>(TYPES.WorkbookBusinessManager).to(WorkbookBusinessManager);
inversifyBaseConfig.bind<IWorkbookFileBusinessManager>(TYPES.WorkbookFileBusinessManager).to(WorkbookFileBusinessManager);
inversifyBaseConfig.bind<IWorkbookPassageBusinessManager>(TYPES.WorkbookPassageBusinessManager).to(WorkbookPassageBusinessManager);
inversifyBaseConfig.bind<IWorkbookPhraseBusinessManager>(TYPES.WorkbookPhraseBusinessManager).to(WorkbookPhraseBusinessManager);
inversifyBaseConfig.bind<IWorkbookSentenceBusinessManager>(TYPES.WorkbookSentenceBusinessManager).to(WorkbookSentenceBusinessManager);
inversifyBaseConfig.bind<IVersionBusinessManager>(TYPES.VersionBusinessManager).to(VersionBusinessManager);
//
// //Data managers
inversifyBaseConfig.bind<IAccIndexBase>(TYPES.AccIndexDataManager).to(AccIndexDataManager);
inversifyBaseConfig.bind<IAccountTypeDataManager>(TYPES.AccountTypeDataManager).to(AccountTypeDataManager);
inversifyBaseConfig.bind<IActivityTypeDataManager>(TYPES.ActivityTypeDataManager).to(ActivityTypeDataManager);
inversifyBaseConfig.bind<IBundleContentDataManager>(TYPES.BundleContentDataManager).to(BundleContentDataManager);
inversifyBaseConfig.bind<IBundleDataManager>(TYPES.BundleDataManager).to(BundleDataManager);
inversifyBaseConfig.bind<IBundleQueueDataManager>(TYPES.BundleQueueDataManager).to(BundleQueueDataManager);
inversifyBaseConfig.bind<ICourseDataManager>(TYPES.CourseDataManager).to(CourseDataManager);
inversifyBaseConfig.bind<ICourseWorkbookActivityDataManager>(TYPES.CourseWorkbookActivityDataManager).to(CourseWorkbookActivityDataManager);
inversifyBaseConfig.bind<ICourseWorkbookDataManager>(TYPES.CourseWorkbookDataManager).to(CourseWorkbookDataManager);
inversifyBaseConfig.bind<ILessonPlanDataManager>(TYPES.LessonPlanDataManager).to(LessonPlanDataManager);
inversifyBaseConfig.bind<ILessonPlanStepDataManager>(TYPES.LessonPlanStepDataManager).to(LessonPlanStepDataManager);
inversifyBaseConfig.bind<IPairingsDataManager>(TYPES.PairingsDataManager).to(PairingsDataManager);
inversifyBaseConfig.bind<IPassageDataManager>(TYPES.PassageDataManager).to(PassageDataManager);
inversifyBaseConfig.bind<IPaymentDataManager>(TYPES.PaymentDataManager).to(PaymentDataManager);
inversifyBaseConfig.bind<IPhraseDataManager>(TYPES.PhraseDataManager).to(PhraseDataManager);
inversifyBaseConfig.bind<IPlanDataManager>(TYPES.PlanDataManager).to(PlanDataManager);
inversifyBaseConfig.bind<IRegistrationDataManager>(TYPES.RegistrationDataManager).to(RegistrationDataManager);
inversifyBaseConfig.bind<ISentenceDataManager>(TYPES.SentenceDataManager).to(SentenceDataManager);
inversifyBaseConfig.bind<ISettingsDataManager>(TYPES.SettingsDataManager).to(SettingsDataManager);
inversifyBaseConfig.bind<ISocialMediaDataManager>(TYPES.SocialMediaDataManager).to(SocialMediaDataManager);
inversifyBaseConfig.bind<ISoundLetterPairingsDataManager>(TYPES.SoundLetterPairingsDataManager).to(SoundLetterPairingsDataManager);
inversifyBaseConfig.bind<IStudentDataManager>(TYPES.StudentDataManager).to(StudentDataManager);
inversifyBaseConfig.bind<ISubscriptionDataManager>(TYPES.SubscriptionDataManager).to(SubscriptionDataManager);
inversifyBaseConfig.bind<ITileBankDataManager>(TYPES.TileBankDataManager).to(TileBankDataManager);
inversifyBaseConfig.bind<ITilesDataManager>(TYPES.TilesDataManager).to(TilesDataManager);
inversifyBaseConfig.bind<IUserDataManager>(TYPES.UserDataManager).to(UserDataManager);
inversifyBaseConfig.bind<IUserSettingsDataManager>(TYPES.UserSettingsDataManager).to(UserSettingsDataManager);
inversifyBaseConfig.bind<IUserActivitySettingsDataManager>(TYPES.UserActivitySettingsDataManager).to(UserActivitySettingsDataManager);
inversifyBaseConfig.bind<IWordDataManager>(TYPES.WordDataManager).to(WordDataManager);
inversifyBaseConfig.bind<IWorkbookDataManager>(TYPES.WorkbookDataManager).to(WorkbookDataManager);
inversifyBaseConfig.bind<IWorkbookFileDataManager>(TYPES.WorkbookFileDataManager).to(WorkbookFileDataManager);
inversifyBaseConfig.bind<IWorkbookPassageDataManager>(TYPES.WorkbookPassageDataManager).to(WorkbookPassageDataManager);
inversifyBaseConfig.bind<IWorkbookPhraseDataManager>(TYPES.WorkbookPhraseDataManager).to(WorkbookPhraseDataManager);
inversifyBaseConfig.bind<IWorkbookSentenceDataManager>(TYPES.WorkbookSentenceDataManager).to(WorkbookSentenceDataManager);

inversifyBaseConfig.bind<IFileDataManager>(TYPES.FileDataManager).to(FileDataManager);
inversifyBaseConfig.bind<ISecurityDataManager>(TYPES.SecurityDataManager).to(SecurityDataManager);
inversifyBaseConfig.bind<IVersionDataManager>(TYPES.VersionDataManager).to(VersionDataManager);

inversifyBaseConfig.bind<IAccIndexBase>(TYPES.AccIndexDataObject).to(AccIndexMongoDao);
inversifyBaseConfig.bind<IAccountTypeBase>(TYPES.AccountTypeDataObject).to(AccountTypeMongoDao);
inversifyBaseConfig.bind<IActivityTypeBase>(TYPES.ActivityTypeDataObject).to(ActivityTypeMongoDao);
inversifyBaseConfig.bind<IBundleBase>(TYPES.BundleDataObject).to(BundleMongoDao);
inversifyBaseConfig.bind<IBundleContentBase>(TYPES.BundleContentDataObject).to(BundleContentMongoDao);
inversifyBaseConfig.bind<IBundleQueueBase>(TYPES.BundleQueueDataObject).to(BundleQueueMongoDao);
inversifyBaseConfig.bind<ICourseBase>(TYPES.CourseDataObject).to(CourseMongoDao);
inversifyBaseConfig.bind<ICourseWorkbookActivityMongoDao>(TYPES.CourseWorkbookActivityDataObject).to(CourseWorkbookActivityMongoDao);
inversifyBaseConfig.bind<ICourseWorkbookBase>(TYPES.CourseWorkbookDataObject).to(CourseWorkbookMongoDao);
inversifyBaseConfig.bind<IFileBase>(TYPES.FileDataObject).to(FileMongoDao);
inversifyBaseConfig.bind<IFileBase>(TYPES.FileDataObject).to(FileGCloudDao);
inversifyBaseConfig.bind<IFileBase>(TYPES.FileDataObject).to(FileFSDao);
inversifyBaseConfig.bind<ILessonPlanBase>(TYPES.LessonPlanDataObject).to(LessonPlanMongoDao);
inversifyBaseConfig.bind<ILessonPlanStepBase>(TYPES.LessonPlanStepDataObject).to(LessonPlanStepMongoDao);
inversifyBaseConfig.bind<IPairingsBase>(TYPES.PairingsDataObject).to(PairingsJsDao);
inversifyBaseConfig.bind<IPassageBase>(TYPES.PassageDataObject).to(PassageMongoDao);
inversifyBaseConfig.bind<IPaymentBase>(TYPES.PaymentDataObject).to(PaymentStripeDao);
inversifyBaseConfig.bind<IPhraseBase>(TYPES.PhraseDataObject).to(PhraseMongoDao);
inversifyBaseConfig.bind<IPlanBase>(TYPES.PlanDataObject).to(PlanMongoDao);
inversifyBaseConfig.bind<IRegistrationMongoDao>(TYPES.RegistrationDataObject).to(RegistrationMongoDao);
inversifyBaseConfig.bind<ISecurityBase>(TYPES.SecurityDataObject).to(SecurityAuth0Dao);
inversifyBaseConfig.bind<ISecurityMongoDao>(TYPES.SecurityMongoDataObject).to(SecurityMongoDao);
inversifyBaseConfig.bind<ISentenceBase>(TYPES.SentenceDataObject).to(SentenceMongoDao);
inversifyBaseConfig.bind<ISettingsMongoDao>(TYPES.SettingsDataObject).to(SettingsMongoDao);
inversifyBaseConfig.bind<ISocialMediaBase>(TYPES.SocialMediaDataObject).to(SocialMediaSlackDao);
inversifyBaseConfig.bind<ISoundLetterPairingsJsDao>(TYPES.SoundLetterPairingsDataObject).to(SoundLetterPairingsJsDao);
inversifyBaseConfig.bind<IStudentBase>(TYPES.StudentDataObject).to(StudentMongoDao);
inversifyBaseConfig.bind<ISubscriptionBase>(TYPES.SubscriptionDataObject).to(SubscriptionMongoDao);
inversifyBaseConfig.bind<ITileBankBase>(TYPES.TileBankDataObject).to(TileBankMongoDao);
inversifyBaseConfig.bind<ITilesBase>(TYPES.TilesDataObject).to(TilesJsDao);
inversifyBaseConfig.bind<IUserBase>(TYPES.UserDataObject).to(UserMongoDao);
inversifyBaseConfig.bind<IUserSettingsBase>(TYPES.UserSettingsDataObject).to(UserSettingsMongoDao);
inversifyBaseConfig.bind<IUserActivitySettingsBase>(TYPES.UserActivitySettingsObject).to(UserActivitySettingsMongoDao);
inversifyBaseConfig.bind<IWordBase>(TYPES.WordDataObject).to(WordMongoDao);
inversifyBaseConfig.bind<IWorkbookBase>(TYPES.WorkbookDataObject).to(WorkbookMongoDao);
inversifyBaseConfig.bind<IWorkbookFileMongoDao>(TYPES.WorkbookFileDataObject).to(WorkbookFileMongoDao);
inversifyBaseConfig.bind<IWorkbookPassageMongoDao>(TYPES.WorkbookPassageDataObject).to(WorkbookPassageMongoDao);
inversifyBaseConfig.bind<IWorkbookPhraseMongoDao>(TYPES.WorkbookPhraseDataObject).to(WorkbookPhraseMongoDao);
inversifyBaseConfig.bind<IWorkbookSentenceMongoDao>(TYPES.WorkbookSentenceDataObject).to(WorkbookSentenceMongoDao);
inversifyBaseConfig.bind<IVersionMongoDao>(TYPES.VersionDataObject).to(VersionMongoDao);

export default inversifyBaseConfig;