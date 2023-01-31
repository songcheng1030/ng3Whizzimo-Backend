import {injectable} from "inversify";
import {activityType} from "../../db";
import IActivityTypeBase from "../../shared/IActivityTypeBase";
import {ActivityTypes} from "../../constants/ActivityTypes";

@injectable()
class ActivityTypeMongoDao implements IActivityTypeBase {
    getAll(): Promise<any> {
        //todo: fix once done with speed up
        return Promise.resolve(Object.values(ActivityTypes));
    }
}

export {ActivityTypeMongoDao};
