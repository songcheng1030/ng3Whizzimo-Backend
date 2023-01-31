import {inject, injectable} from "inversify";
import * as randomstring from 'randomstring';
import IFileBusinessManager from "../IFileBusinessManager";
import IFileDataManager from "../../dataManagers/IFileDataManager";
import TYPES from "../../../types";
import {Errors} from "../../constants/Errors";
import IWorkbookFileDataManager from "../../dataManagers/IWorkbookFileDataManager";

@injectable()
class FileBusinessManager implements IFileBusinessManager {
    private _fileDataManager:IFileDataManager;
    private _workbookFileDataManager:IWorkbookFileDataManager;

    constructor(
        @inject(TYPES.FileDataManager) fileDataManager:IFileDataManager,
        @inject(TYPES.WorkbookFileDataManager) workbookFileDataManager:IWorkbookFileDataManager
    ){
        this._fileDataManager = fileDataManager;
        this._workbookFileDataManager = workbookFileDataManager;
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.file || !data.name) {
                return reject(Errors.missingParametersBody);
            }

            var name = data.name;
            name = name.substring(0, name.lastIndexOf("."));

            data.name = `${name}-${randomstring.generate({length: 10, charset: 'alphanumeric'})}.pdf`;

            this._fileDataManager
                .create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    createMany(data: any): Promise<any[]> {
        let requests: any[] = [];

        for(let file of data) {
            requests.push(this.create(file));
        }

        return Promise.all(requests);
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._fileDataManager
                .delete(id)
                .then(() => {
                   return this._workbookFileDataManager.deleteMany(id);
                })
                .then(() => {
                    resolve(null);
                })
                .catch((error: any) => reject(error));
        });
    }

    get(id: string): Promise<any> {
        return this._fileDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._fileDataManager.getMany(id);
    }

    protectedDelete(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => this.delete(id))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    protectedUpdate(id: string, data: any, locals: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.validateOwner(id, locals)
                .then(() => this.update(id, data))
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._fileDataManager.update(id, data)
                .then((result: any) => {
                    return resolve(result)
                })
                .catch((error: any) => reject(error));
        });
    }

    validateOwner(id: string, locals: any): Promise<any> {
        return new Promise((resolve, reject) =>  {
            if(locals.admin) {
                return resolve(null);
            }

            this._fileDataManager
                .get(id)
                .then((result: any) => {
                    if(!result || result.ownerKey !== locals.userId) {
                        return reject(Errors.notAuthorized)
                    }
                    return resolve('OK');
                })
                .catch((error: any) => reject(error));
        });
    }

    protectedCreate(data: any, locals: any): Promise<any> {
        if(locals.admin) {
            return Promise.resolve(null);
        }

        return new Promise((resolve, reject) => {
            data.ownerKey = locals.userId;

            this.create(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    simpleCreate(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('data', data)
            if(!data || (!data.file && !data.name)) {
                return reject(Errors.missingParametersBody);
            }

                this._fileDataManager
                .simpleCreate(data)
                .then((result: any) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

}

export {FileBusinessManager};
