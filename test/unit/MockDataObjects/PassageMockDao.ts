import {injectable} from "inversify";
import IPassageBase from "../../../app/shared/IPassageBase";
import {Errors} from "../../../app/constants/Errors";

@injectable()
class PassageMockDao implements IPassageBase {
    private db:any[] = [
        {
            _id: "1",
            ownerKey: "WhizzimoAcademy:139",
            passage: "Hello.This is magic1.",
            workbookKeys : [
                "tWe9lI05em"
            ]
        },
        {
            _id: "2",
            workbookKeys: [
                "d7VbCKFmsf"
            ],
            ownerKey: "WhizzimoAcademy:74",
            passage: "Testing .."
        }
    ];
    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.push(data);
            resolve('OK');
        });
    }

    delete(id: string): Promise<any> {
        return undefined;
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const passage = this.db.find(passage => passage._id === id);
            resolve(passage);
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let passageIndex = this.db.findIndex(passage => passage._id === id);
            if(passageIndex < 0) {
                reject(Errors.notFound('Passage'));
            }
            this.db[passageIndex] = {...this.db[passageIndex], ...data};
            resolve('OK');
        });
    }

}

export {PassageMockDao};
