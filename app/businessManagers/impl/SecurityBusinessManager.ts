import ISecurityBusinessManager from "../ISecurityBusinessManager";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import ISecurityDataManager from "../../dataManagers/ISecurityDataManager";

@injectable()
class SecurityBusinessManager implements ISecurityBusinessManager {
    private _securityDataManager:ISecurityDataManager;
    constructor(
        @inject(TYPES.SecurityDataManager) securityDataManager:ISecurityDataManager
    ){
        this._securityDataManager = securityDataManager;
    }

    createUser(body: any): Promise<any> {
        return this._securityDataManager.createUser(body);
    }

    deleteUser(id: string): Promise<any> {
        return this._securityDataManager.deleteUser(id);
    }

    getUser(id: string): Promise<any> {
        return this._securityDataManager.getUser(id);
    }

    getUserByEmailAddress(emailAddress: string): Promise<any> {
        return this._securityDataManager.getUserByEmailAddress(emailAddress);
    }

    searchUsers(field: string, value: string): Promise<any> {
        return this._securityDataManager.searchUsers(field, value);
    }

    updateUser(id: string, updatedUssr: any): Promise<any> {
        return this._securityDataManager.updateUser(id, updatedUssr);
    }

    verifyUser(token: string): Promise<any> {
        return this._securityDataManager.verifyUser(token);
    }

    resetPassword(emailAddress: string): Promise<any> {
        return this._securityDataManager.resetPassword(emailAddress);
    }
}

export {SecurityBusinessManager};
