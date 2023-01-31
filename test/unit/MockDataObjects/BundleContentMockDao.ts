import {injectable} from "inversify";
import IBundleContentBase from "../../../app/shared/IBundleContentBase";
import * as randomstring from 'randomstring';

@injectable()
class BundleContentMockDao implements IBundleContentBase {
    private db:any[] = [];

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data._id = randomstring.generate({length: 6, charset: 'alphanumeric'});

            this.db.push(data);

            resolve(data);
        });
    }

    delete(id: string): Promise<any> {
        return undefined;
    }

    deleteByBundleId(bundleId: string): Promise<any> {
        return undefined;
    }

    deleteByContentId(contentId: string): Promise<any> {
        return undefined;
    }

    deleteManyByContentId(contentIds: string[]): Promise<any> {
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

export {BundleContentMockDao};
