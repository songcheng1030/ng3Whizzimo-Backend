import {inject, injectable} from "inversify";
import ITileBankBusinessManager from "../ITileBankBusinessManager";
import ITileBankDataManager from "../../dataManagers/ITileBankDataManager";
import TYPES from "../../../types";
import {DefaultTileBank} from "../../constants/DefaultTileBank";

@injectable()
class TileBankBusinessManager implements ITileBankBusinessManager {
    private _tileBankDataManager:ITileBankDataManager;

    constructor(
        @inject(TYPES.TileBankDataManager) tileBankDataManager:ITileBankDataManager
    ) {
        this._tileBankDataManager = tileBankDataManager;
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._tileBankDataManager
                .get(id)
                .then((result) => {
                    if(!result) {
                        return
                    }
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    getByUserId(id: string): Promise<any> {
        return this._tileBankDataManager.getByUserId(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._tileBankDataManager.update(id, data);
    }

    create(data: any): Promise<any> {
        return this._tileBankDataManager.create(data);
    }

}

export {TileBankBusinessManager};
