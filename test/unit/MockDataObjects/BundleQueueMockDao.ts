import {injectable} from "inversify";
import IBundleQueueBase from "../../../app/shared/IBundleQueueBase";

@injectable()
class BundleQueueMockDao implements IBundleQueueBase {
    create(data: any): Promise<any> {
        return undefined;
    }

    delete(id: string): Promise<any> {
        return undefined;
    }

    deleteByBundleId(bundleId: string): Promise<any> {
        return undefined;
    }

    get(id: string): Promise<any> {
        return undefined;
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }

}

export {BundleQueueMockDao};
