import IAccIndexBase from "../../shared/IAccIndexBase";
import {injectable} from "inversify";
import {accIndex} from '../../db';

@injectable()
class AccIndexMongoDao implements IAccIndexBase {
    update(): Promise<any> {
        return new Promise((resolve, reject) => {
            accIndex.find()
                .then((result: any) => {
                    return accIndex.update({}, {$set: {accIndex: result[0].accIndex + 1}})
                })
                .then(() => accIndex.find())
                .then((result: any) => {
                    if(result.lengh === 0) {
                        return resolve(null);
                    }

                    resolve(result[0]);
                })
                .catch((error: any) => reject(error));
        });
    }

    get(): Promise<any> {
        return accIndex.find({})
    }
}

export {AccIndexMongoDao};
