import IBundleBase from "../../../app/shared/IBundleBase";
import {id, injectable} from "inversify";
import * as randomstring from 'randomstring';

@injectable()
class BundleMockDao2 implements IBundleBase {
    test = 1;

    private db:any[] = [
        {
            "_id" : "1",
            "ownerKey" : "1",
            "type" : "course",
            "name" : "test",
            "code" : "kub17k"
        }
    ];


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

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(this.db.find(bundle => bundle._id === id));
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const matchedIndex = this.db.findIndex(bundle => bundle._id === id);
            if(matchedIndex < 0) reject();
            else resolve('OK');
        });
    }

    getByCode(code: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}

export {BundleMockDao2};
