import IUserDataManager from "../IUserDataManager";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import IUserMongoDao from "../../dataObjects/IUserMongoDao";
import IUserBase from "../../shared/IUserBase";

@injectable()
class UserDataManager implements IUserDataManager {
    private _dao:IUserBase;

    constructor(
        @inject(TYPES.UserDataObject) userDataObject: IUserBase
    ){
        this._dao = userDataObject;
    }

    create(data: any): Promise<any> {
        return this._dao.create(data);
    }

    delete(id: string): Promise<any> {
        return this._dao.delete(id);
    }

    get(id: string): Promise<any> {
        return this._dao.get(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._dao.update(id, data);
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    getByEmail(email: string): Promise<any> {
        return this._dao.getByEmail(email);
    }

    getByIdOrEmail(userInfo: string): Promise<any> {
        return this._dao.getByIdOrEmail(userInfo);
    }

}

export {UserDataManager};
