import {injectable} from "inversify";
import IRegistrationBase from "../../../app/shared/IRegistrationBase";

@injectable()
class RegistrationMockDao implements IRegistrationBase {

}

export {RegistrationMockDao};
