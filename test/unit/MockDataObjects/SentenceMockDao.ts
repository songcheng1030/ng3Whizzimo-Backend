import {injectable} from "inversify";
import ISentenceBase from "../../../app/shared/ISentenceBase";
import {Errors} from "../../../app/constants/Errors";

@injectable()
class SentenceMockDao implements ISentenceBase {
    private db:any[] = [
        {
            _id: "1",
            ownerKey: "WhizzimoAcademy:139",
            sentence: "Hello.This is magic1.",
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
            sentence: "Testing .."
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
            const sentence = this.db.find(sentence => sentence._id === id);
            resolve(sentence);
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let sentenceIndex = this.db.findIndex(sentence => sentence._id === id);
            if(sentenceIndex < 0) {
                reject(Errors.notFound('Sentence'));
            }
            this.db[sentenceIndex] = {...this.db[sentenceIndex], ...data};
            resolve('OK');
        });
    }

}

export {SentenceMockDao};
