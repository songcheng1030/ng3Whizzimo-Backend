
   
import {inject, injectable} from "inversify";
import ICourseWorkbookActivityBusinessManager from "../ICourseWorkbookActivityBusinessManager";
import TYPES from "../../../types";
import ICourseWorkbookActivityDataManager from "../../dataManagers/ICourseWorkbookActivityDataManager";
import {Errors} from "../../constants/Errors";
import ICourseWorkbookBusinessManager from "../ICourseWorkbookBusinessManager";
import ICourseWorkbookDataManager from "../../dataManagers/ICourseWorkbookDataManager";
import IUserActivitySettingsBusinessManager from "../IUserActivitySettingsBusinessManager";
import IActivityTypeBusinessManager from "../IActivityTypeBusinessManager";
import {DefaultMiniTiles} from "../../constants/DefaultMiniTiles";
import {DefaultActivitySettings} from "../../constants/DefaultUserActivitySettings";
import ISettingsBusinessManager from "../ISettingsBusinessManager";

@injectable()
class CourseWorkbookActivityBusinessManager implements ICourseWorkbookActivityBusinessManager {
    private _courseWorkbookActivityDataManager: ICourseWorkbookActivityDataManager;
    private _courseWorkbookDataManager: ICourseWorkbookDataManager;
    private _settingsBusinessManager: ISettingsBusinessManager
    private _activityTypeBusinessManager: IActivityTypeBusinessManager;

    constructor(
        @inject(TYPES.CourseWorkbookActivityDataManager) courseWorkbookActivityDataManager: ICourseWorkbookActivityDataManager,
        @inject(TYPES.CourseWorkbookDataManager) courseWorkbookDataManager: ICourseWorkbookDataManager,
        @inject(TYPES.SettingsBusinessManager) settingsBusinessManager: ISettingsBusinessManager,
        @inject(TYPES.ActivityTypeBusinessManager) activityTypeBusinessManager: IActivityTypeBusinessManager
    ) {
        this._courseWorkbookActivityDataManager = courseWorkbookActivityDataManager;
        this._courseWorkbookDataManager = courseWorkbookDataManager;
        this._settingsBusinessManager = settingsBusinessManager;
        this._activityTypeBusinessManager = activityTypeBusinessManager;
    }

    delete(id: string): Promise<any> {
        return this._courseWorkbookActivityDataManager.delete(id);
    }

    getByCourseWorkbookAndActivityType(courseWorkbookId: string, activityTypeId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let wordNum = 15;
            this._courseWorkbookActivityDataManager
                .getByCourseWorkbookAndActivityType(courseWorkbookId, activityTypeId)
                .then((courseWorkbookActivity: any) => {
                    if(!courseWorkbookActivity) {
                        this._courseWorkbookDataManager
                            .get(courseWorkbookId)
                            .then((courseWorkbook:any) => {
                                return this.createFromUserActivitySettings(courseWorkbook, activityTypeId);
                            })
                            .then((courseWorkbookActivity:any) => {
                                resolve(courseWorkbookActivity);
                            })
                            .catch((error:any) => {
                                reject(error)
                            });
                    } else {
                        resolve(courseWorkbookActivity);
                    }
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    createFromUserActivitySettings(courseWorkbook: any, activityTypeId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let activity: any;
            this._activityTypeBusinessManager
                .getAll()
                .then((activityTypes: any[]) => {
                    activity = activityTypes.find(activityType => activityType._id.toString() === activityTypeId);
                    return this._settingsBusinessManager.getMany(courseWorkbook.ownerKey);
                })
                .then((userActivitySetings: any[]) => {
                    let defaultSettings = userActivitySetings.find(settings => settings.isCurrent);
                    if (!defaultSettings) {
                        defaultSettings = userActivitySetings[0];
                    }
                    let activityKey = Object.keys(defaultSettings)
                        .find(key => {
                            const keyName = key.toLowerCase().replace(/ /g, '');
                            const activityName = activity.name.toLowerCase().replace(/ /g, '');
                            return keyName === activityName
                                || (activity.name.toLowerCase().indexOf('mini') >= 0 && key.toLowerCase().indexOf('mini') >= 0);
                        });

                    let newActivitySettings: any = {
                        courseWorkbookId: courseWorkbook._id,
                        words: courseWorkbook.fullWords,
                        numWords:defaultSettings[activityKey].wordNum || 15,
                        activityTypeId: activityTypeId,
                        workbookId: courseWorkbook.workbookId
                    };

                    if(activity.name.toLowerCase().indexOf('mini') >= 0) {
                        newActivitySettings.miniTiles = DefaultMiniTiles;
                    }

                    if(activity.name.toLowerCase().indexOf('blank') >= 0) {
                        newActivitySettings.blankTiles = DefaultActivitySettings.blankTiles;
                    }

                    return this._courseWorkbookActivityDataManager.create(newActivitySettings);
                })
                .then((courseWorkbookActivity: any) => resolve(courseWorkbookActivity))
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    update(id: string, data: any): Promise<any> {
        return this._courseWorkbookActivityDataManager.update(id, data);
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

    validateOwner(courseWorkbookActivityId: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) =>  {
            if(locals.admin) {
                return resolve(null);
            }

            this._courseWorkbookActivityDataManager
                .get(courseWorkbookActivityId)
                .then((result: any) => {
                    if(!result) {
                        return reject(Errors.notAuthorized)
                    }

                    return this._courseWorkbookDataManager.get(result[0].courseWorkbookId);
                })
                .then((result: any) => {
                    if(!result || result.ownerKey !== locals.userId) {
                        return reject(Errors.notAuthorized);
                    }

                    resolve('OK');
                })
        })
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        return undefined;
    }

    updateByWorkbookId(workbookId: string, updatedCourseWorkbookActivity: any): Promise<any> {
        return this._courseWorkbookActivityDataManager.updateByWorkbookId(workbookId, updatedCourseWorkbookActivity);
    }

    copy(courseWorkbookActivityId: string, courseWorkbookId: string): Promise<any> {
        return new Promise((resolve, reject) => {
           this.get(courseWorkbookActivityId)
               .then(result => {
                   let courseWorkbookActivity = result[0];
                   delete courseWorkbookActivity._id;

                   courseWorkbookActivity.courseWorkbookId = courseWorkbookId;

                   return this.create(courseWorkbookActivity);
               })
               .then((result: any) => {
                   resolve(result)
               })
               .catch((error: any) => {
                   reject(error)
               });
        });
    }

    get(id: string): Promise<any> {
       return this._courseWorkbookActivityDataManager.get(id);
    }

    create(data: any): Promise<any> {
        return this._courseWorkbookActivityDataManager.create(data);
    }

    getByCourseWorkbookId(courseWorkbookId: string): Promise<any> {
        return this._courseWorkbookActivityDataManager.getByCourseWorkbookId(courseWorkbookId);
    }

    async copyFromCourseWorkbookId(courseWorkbookId: string, destCourseWorkbookId: string) {
       const courseWorkbookActivities = await this.getByCourseWorkbookId(courseWorkbookId);
       if(courseWorkbookActivities?.length > 0) {
           const copied = await Promise.all(courseWorkbookActivities.map((a: any) => {
               return this.copy(a._id, destCourseWorkbookId)
           }))
       } 
    }
}

export {CourseWorkbookActivityBusinessManager};
