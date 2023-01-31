import {injectable} from "inversify";
import IAccountTypeBase from "../../shared/IAccountTypeBase";
import {stripePlan} from "../../db";

@injectable()
class AccountTypeMongoDao implements IAccountTypeBase {
    getMany(): Promise<any> {
        return stripePlan.find({active: true}, {_id: 1});
    }

}

export {AccountTypeMongoDao};
