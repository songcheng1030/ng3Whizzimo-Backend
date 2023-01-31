import {injectable} from "inversify";
import IPlanBase from "../../shared/IPlanBase";
import {stripePlan} from "../../db";

@injectable()
class PlanMongoDao implements IPlanBase {
    getActive(): Promise<any> {
        return new Promise((resolve, reject) => {
            stripePlan
                .find({active: true})
                .then((result:any[]) => {
                    resolve(result)
                })
                .catch((error:any) => reject(error));
        });
    }

    getAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            stripePlan
                .find()
                .then((result:any[]) => {
                    resolve(result)
                })
                .catch((error:any) => reject(error));
        });
    }

}

export {PlanMongoDao};
