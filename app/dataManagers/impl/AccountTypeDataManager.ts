import {inject, injectable} from "inversify";
import IAccountTypeDataManager from "../IAccountTypeDataManager";
import IAccountTypeBase from "../../shared/IAccountTypeBase";
import TYPES from "../../../types";

@injectable()
class AccountTypeDataManager implements IAccountTypeDataManager{
    private _dao:IAccountTypeBase;

    constructor(
        @inject(TYPES.AccountTypeDataObject) dao:IAccountTypeBase
    ) {
        this._dao = dao;
    }

    getMany(): Promise<any> {
        return this._dao.getMany();
    }

}

export {AccountTypeDataManager};
