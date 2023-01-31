import {inject, injectable} from "inversify";
import ISubscriptionBusinessManager from "../ISubscriptionBusinessManager";
import ISubscriptionDataManager from "../../dataManagers/ISubscriptionDataManager";
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";
import ICourseBusinessManager from "../ICourseBusinessManager";

@injectable()
export class SubscriptionBusinessManager implements ISubscriptionBusinessManager {
    private _subscriptionDataManager: ISubscriptionDataManager;
    private _courseBusinessMangaer: ICourseBusinessManager;

    constructor(
        @inject(TYPES.SubscriptionDataManager) subscriptionDataManager:ISubscriptionDataManager,
        @inject(TYPES.CourseBusinessManager) courseBusinessManager:ICourseBusinessManager
    ) {
        this._subscriptionDataManager = subscriptionDataManager;
        this._courseBusinessMangaer = courseBusinessManager;
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._courseBusinessMangaer
                .get(data.courseId)
                .then((course) => {
                    if(!course) {
                        return reject(Errors.notFound('Course'));
                    }

                    return this._subscriptionDataManager.create(data)
                })
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    createMany(data: any[]): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const dataCreate = [];
            for(let dt of data){
                try{
                    const checkValid = await this._courseBusinessMangaer.get(dt.courseId);
                    if(checkValid){
                        dataCreate.push(dt);
                    }
                }
                catch(ex){
                    console.log(ex)
                }
            }
            if(dataCreate.length === 0){
                return reject(Errors.notFound('Course '));
            }
            this._subscriptionDataManager.createMany(dataCreate)
            .then((result: any) => resolve(result))
            .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        return this._subscriptionDataManager.delete(id);
    }

    get(id: string): Promise<any> {
        return this._subscriptionDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._subscriptionDataManager.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._subscriptionDataManager.update(id, data);
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data.userId = locals.userId;

            this.create(data)
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    protectedCreateMany(data: any[], locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.createMany(data)
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    protectedDelete(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => {
                    return this.delete(id)
                })
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });

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

    validateOwner(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) =>  {
            if(locals.admin) {
                return resolve(null);
            }

            this._subscriptionDataManager
                .get(id)
                .then((result: any) => {
                    if(!result || result.userId !== locals.userId) {
                        return reject(Errors.notAuthorized);
                    }

                    resolve('OK');
                });
        });
    }

}
