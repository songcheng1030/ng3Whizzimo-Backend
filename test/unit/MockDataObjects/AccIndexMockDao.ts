import {injectable} from "inversify";
import IAccIndexBase from "../../../app/shared/IAccIndexBase";

@injectable()
class AccIndexMockDao implements IAccIndexBase {
    private static callTimes:number = 0;
    get(): Promise<any> {
        return Promise.resolve({accIndex: AccIndexMockDao.callTimes});
    }

    update(): Promise<any> {
        return Promise.resolve({accIndex: ++AccIndexMockDao.callTimes});
    }

}

export {AccIndexMockDao};
