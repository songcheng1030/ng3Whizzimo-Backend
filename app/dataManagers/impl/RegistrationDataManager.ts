import {injectable, inject} from "inversify";
import TYPES from "../../../types";
import IRegistrationDataManager from "../IRegistrationDataManager";
import IRegistrationBase from "../../shared/IRegistrationBase";

@injectable()
class RegistrationDataManager implements IRegistrationDataManager {
    private _dao: IRegistrationBase;
    public constructor(
        @inject(TYPES.RegistrationDataObject) dao: IRegistrationBase
    ) {
        this._dao = dao;
    }
}

export {RegistrationDataManager};
