import {inject, injectable} from "inversify";
import IStudentDataManager from "../IStudentDataManager";
import ISubscriptionDataManager from "../ISubscriptionDataManager";
import IStudentBase from "../../shared/IStudentBase";
import ISubscriptionMongoDao from "../../dataObjects/ISubscriptionMongoDao";
import TYPES from "../../../types";

@injectable()
export class SubscriptionDataManager implements ISubscriptionDataManager {
    _dao: ISubscriptionMongoDao;

    constructor(
        @inject(TYPES.SubscriptionDataObject) dao:ISubscriptionMongoDao
    ){
        this._dao = dao;
    }

    create(data: any): Promise<any> {
        return this._dao.create(data);
    }

    createMany(data: any): Promise<any> {
        return this._dao.createMany(data);
    }

    delete(id: string): Promise<any> {
        return this._dao.delete(id);
    }

    get(id: string): Promise<any> {
        return this._dao.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._dao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return Promise.resolve(undefined);
    }

}
