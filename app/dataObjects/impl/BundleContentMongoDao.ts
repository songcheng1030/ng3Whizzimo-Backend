import {injectable} from "inversify";
import {bundleContent} from "../../db";
import IBundleContentBase from "../../shared/IBundleContentBase";
const ObjectId = require('bson-objectid');

@injectable()
class BundleContentMongoDao implements IBundleContentBase {
    create(data: any): Promise<any> {
        return bundleContent.insert(data);
    }

    delete(id: string): Promise<any> {
        return bundleContent.remove({_id: ObjectId(id)});
    }

    get(id: string): Promise<any> {
        return bundleContent.find({_id: ObjectId(id)});
    }

    getMany(id: string): Promise<any> {
        return bundleContent.find({bundleCode: id});
    }

    update(id: string, data: any): Promise<any> {
        return bundleContent.update({_id: ObjectId(id)}, {$set: data});
    }

    deleteByBundleId(bundleId: string): Promise<any> {
        return bundleContent.remove({bundleId: bundleId});
    }

    deleteByContentId(contentId: string): Promise<any> {
        return bundleContent.remove({contentId: contentId});
    }

    deleteManyByContentId(contentIds: string[]): Promise<any> {
        const query = contentIds.map(contentId => ({contentId: contentId}));

        return bundleContent.remove({$or: query});
    }

}

export {BundleContentMongoDao};
