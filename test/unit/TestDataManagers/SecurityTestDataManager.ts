import {inject, injectable, multiInject} from "inversify";
import ISecurityDataManager from "../../../app/dataManagers/ISecurityDataManager";
import ISecurityBase from "../../../app/shared/ISecurityBase";
import TYPES from "../../../types";

@injectable()
class SecurityTestDataManager implements ISecurityDataManager {
    private _dao: ISecurityBase;
    constructor(
        @inject(TYPES.SecurityDataObject) dao: ISecurityBase,
    ) {
        this._dao = dao;
    }

    createUser(body: any): Promise<any> {
        return this._dao.createUser(body);
    }

    deleteUser(id: string): Promise<any> {
        return this._dao.deleteUser(id);
    }

    getUser(id: string): Promise<any> {
        return this._dao.getUser(id);
    }

    searchUsers(field: string, value: string): Promise<any> {
        return this._dao.searchUsers(field, value);
    }

    updateUser(id: string, updatedUssr: any): Promise<any> {
        return this._dao.updateUser(id, updatedUssr);
    }

    verifyUser(token: string): Promise<any> {
        return new Promise((resolve, reject) =>{
            this._dao
                .verifyUser(token)
                .then((result: any) => {
                    if(result) {
                        return resolve(result)
                    }

                    this._dao
                        .verifyUser(token)
                        .then((result: any) => {
                            result.token = token;
                            return;
                        })
                        .then((result: any) => resolve(result))
                        .catch((error: any) => reject(error));
                })
                .catch((error: any) => reject(error));
        });
    }

    getUserByEmailAddress(emailAddress: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    resetPassword(emailAddress: string): Promise<any> {
        return Promise.resolve(undefined);
    }
}

export {SecurityTestDataManager};
