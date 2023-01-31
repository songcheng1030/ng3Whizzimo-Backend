import ISecurityDataManager from "../ISecurityDataManager";
import {inject, injectable, multiInject} from "inversify";
import TYPES from "../../../types";
import ISecurityBase from "../../shared/ISecurityBase";
import ISecurityMongoDao from "../../dataObjects/ISecurityMongoDao";

@injectable()
class SecurityDataManager implements ISecurityDataManager {
    private _auth0SecurityDao: ISecurityBase;
    private _mongoSecurityDao: ISecurityMongoDao;
    constructor(
        @inject(TYPES.SecurityDataObject) auth0SecurityDao: ISecurityBase,
        @inject(TYPES.SecurityMongoDataObject) mongoSecurityDao: ISecurityMongoDao,
    ) {
        this._auth0SecurityDao = auth0SecurityDao;
        this._mongoSecurityDao = mongoSecurityDao;
    }

    createUser(body: any): Promise<any> {
        return this._auth0SecurityDao.createUser(body);
    }

    deleteUser(id: string): Promise<any> {
        return this._auth0SecurityDao.deleteUser(id);
    }

    getUser(id: string): Promise<any> {
        return this._auth0SecurityDao.getUser(id);
    }

    getUserByEmailAddress(emailAddress: string): Promise<any> {
        return this._auth0SecurityDao.getUserByEmailAddress(emailAddress);
    }

    searchUsers(field: string, value: string): Promise<any> {
        return this._auth0SecurityDao.searchUsers(field, value);
    }

    updateUser(id: string, updatedUssr: any): Promise<any> {
        return this._auth0SecurityDao.updateUser(id, updatedUssr);
    }

    verifyUser(token: string): Promise<any> {
        return new Promise((resolve, reject) =>{
            this._mongoSecurityDao
                .verifyUser(token)
                .then((result: any) => {
                    if(result) {
                        return resolve(result)
                    }

                    this._auth0SecurityDao
                        .verifyUser(token)
                        .then((result: any) => {
                            result.token = token;
                            return this._mongoSecurityDao.createSecurityEntry(result);
                        })
                        .then((result: any) => resolve(result))
                        .catch((error: any) => reject(error));
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    resetPassword(emailAddress: string): Promise<any> {
        return this._auth0SecurityDao.resetPassword(emailAddress);
    }
}

export {SecurityDataManager};
