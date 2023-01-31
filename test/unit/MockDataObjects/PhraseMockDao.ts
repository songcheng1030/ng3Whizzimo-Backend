import {injectable} from "inversify";
import IPhraseBase from "../../../app/shared/IPhraseBase";
import {Errors} from "../../../app/constants/Errors";

@injectable()
class PhraseMockDao implements IPhraseBase {
    private db:any[] = [
        {
            _id: "1",
            ownerKey: "WhizzimoAcademy:139",
            phrase: "Hello.This is magic1.",
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
            phrase: "Testing .."
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
            const phrase = this.db.find(phrase => phrase._id === id);
            resolve(phrase);
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let phraseIndex = this.db.findIndex(phrase => phrase._id === id);
            if(phraseIndex < 0) {
                reject(Errors.notFound('Phrase'));
            }
            this.db[phraseIndex] = {...this.db[phraseIndex], ...data};
            resolve('OK');
        });
    }

}

export {PhraseMockDao};
