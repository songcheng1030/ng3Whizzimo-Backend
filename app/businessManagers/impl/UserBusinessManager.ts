import {inject, injectable} from "inversify";
import IUserBusinessManager from "../IUserBusinessManager";
import TYPES from "../../../types";
import IUserDataManager from "../../dataManagers/IUserDataManager";
import ICourseBusinessManager from "../ICourseBusinessManager";
import ISecurityBusinessManager from "../ISecurityBusinessManager";

@injectable()
class UserBusinessManager implements IUserBusinessManager {
    private _userDataManager: IUserDataManager;
    private _courseBusinessManager: ICourseBusinessManager;
    private _securityBusinessManager: ISecurityBusinessManager;

    constructor(
        @inject(TYPES.UserDataManager) userDataManager: IUserDataManager,
        @inject(TYPES.CourseBusinessManager) courseBusinessManager:ICourseBusinessManager,
        @inject(TYPES.SecurityBusinessManager) securityBusinessmanager:ISecurityBusinessManager
    ) {
        this._userDataManager = userDataManager;
        this._courseBusinessManager = courseBusinessManager;
        this._securityBusinessManager = securityBusinessmanager;
    }
    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._userDataManager
                .create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._courseBusinessManager.getMany(id)
                .then(courses => {
                    return Promise.all(courses.map((course:any) => this._courseBusinessManager.delete(course._id)))
                })
                .then(() => {
                    return this._securityBusinessManager.searchUsers('user_metadata.uid', id);
                })
                .then(auth0Users => {
                    let user = auth0Users.data.find((user:any) => user.identities[0].connection === 'whizzimoDev');
                    return this._securityBusinessManager.deleteUser(user.user_id)
                })
                .then(() =>  {
                    return this._userDataManager.delete(id);
                })
                .then(() => resolve(null))
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        return this._userDataManager.get(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._userDataManager.update(id, data);
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    getByEmail(email: string): Promise<any> {
        let data: any = {};
        return new Promise((resolve, reject) => {
            this._userDataManager.getByEmail(email)
                .then(user => {
                    data.whizzimoId = user?._id;
                    data.stripeId = user?.cusID;
                    data.email = user?.email;
                    return this._securityBusinessManager.getUserByEmailAddress(email);
                })
                .then(auth0 => {
                    data.auth0Id = auth0?.user_id;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    getByIdOrEmail(userInfo: string): Promise<any> {
        return this._userDataManager.getByIdOrEmail(userInfo);
    }

}

export {UserBusinessManager};
