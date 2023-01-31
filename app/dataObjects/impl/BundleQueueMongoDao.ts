import {injectable} from "inversify";
import {bundleQueue} from "../../db";
import IBundleQueueBase from "../../shared/IBundleQueueBase";
const ObjectId = require('bson-objectid');

@injectable()
class BundleQueueMongoDao implements IBundleQueueBase {
    create(data: any): Promise<any> {
        return bundleQueue.insert(data);
    }

    delete(id: string): Promise<any> {
        return bundleQueue.remove({_id: ObjectId(id)});
    }

    get(id: string): Promise<any> {
        return undefined;
    }

    getMany(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: { "ownerKey": id }},
                { $lookup: {from: "bundle", localField: "bundleId", foreignField: "_id", as: "bundles" } },
            ];

            bundleQueue
                .aggregate(pipeline)
                .then((result:any) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }

    deleteByBundleId(bundleId: string): Promise<any> {
        return bundleQueue.remove({bundleId: bundleId});
    }

}

export {BundleQueueMongoDao};
