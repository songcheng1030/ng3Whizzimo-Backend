import {injectable} from "inversify";
import IFileBase from "../../../app/shared/IFileBase";

@injectable()
class FileMockDao implements IFileBase {
    private db:any[] = [
        {
            _id: '1',
            ownerKey: 'WhizzimoAcademy:1',
            newFile: {}
        },
        {
            _id: '2',
            ownerKey: 'WhizzimoAcademy:2',
            newFile: {}
        }
    ];

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.push(data);
            resolve(data);
        });
    }

    delete(id: string): Promise<any> {
        return undefined;
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(this.db.find(item => item._id === id));
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }

}

export {FileMockDao};
