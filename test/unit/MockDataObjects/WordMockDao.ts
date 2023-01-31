import {injectable} from "inversify";
import IWordBase from "../../../app/shared/IWordBase";

@injectable()
class WordMockDao implements IWordBase {
    get(filter: any): Promise<any> {
        return new Promise((resolve) => {
            resolve({
               word: 'test'
            });
        });
    }

    getWordsByIds(ids: number[]): Promise<any> {
        return Promise.resolve(undefined);
    }

}

export {WordMockDao};
