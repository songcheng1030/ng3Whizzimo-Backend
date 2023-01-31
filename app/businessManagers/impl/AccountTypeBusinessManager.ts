import {inject, injectable} from "inversify";
import IAccountTypeBusinessManager from "../IAccountTypeBusinessManager";
import IAccountTypeDataManager from "../../dataManagers/IAccountTypeDataManager";
import TYPES from "../../../types";

@injectable()
class AccountTypeBusinessManager implements IAccountTypeBusinessManager {
    private _accountTypeDataManager:IAccountTypeDataManager;

    constructor(
        @inject(TYPES.AccountTypeDataManager) accountTypeDataManager: IAccountTypeDataManager
    ){
        this._accountTypeDataManager = accountTypeDataManager;
    }

    getMany(): Promise<any> {
        return this._accountTypeDataManager.getMany();
    }

}

export {AccountTypeBusinessManager};
