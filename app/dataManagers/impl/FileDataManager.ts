import {inject, injectable, multiInject} from "inversify";
import IFileDataManager from "../IFileDataManager";
import TYPES from "../../../types";
import IFileMongoDao from "../../dataObjects/IFileMongoDao";
import IFileBase from "../../shared/IFileBase";
import {files} from "../../db";

@injectable()
class FileDataManager implements IFileDataManager {
    private _mongoDao:IFileBase;
    private _gCloudDao:IFileBase;
    private _fileSystemDao:IFileBase;

    constructor(
        @multiInject(TYPES.FileDataObject) daos:IFileBase[]
    ){
        this._mongoDao = daos[0];
        this._gCloudDao = daos[1];
        this._fileSystemDao = daos[2];
    }

    create(data: any): Promise<any> {
        let filename = "";
        return new Promise((resolve, reject) => {
            this._fileSystemDao.create(data)
                .then(() => this._gCloudDao.create(data))
                .then((res) => {
                    data.file = res.file;
                    filename = 'uploads/' + data.name;
                })
                .then(() => {
                    var name = data.name;
                    name = name.substring(0, name.lastIndexOf("-")) + ".pdf";
                    return this._mongoDao.create({
                        name: name,
                        file: data.name,
                        ownerKey: data.ownerKey
                    });
                })
                .then((result: any) => {
                    console.log('id', result._id)
                    return this.get(result._id)
                })
                .then((result: any) => {
                    this._fileSystemDao.delete(filename);

                    resolve(result);
                })
                .catch((error: any) => reject(error));
        });
    }

    delete(id: string): Promise<any> {
        return this._mongoDao.delete(id);
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let fileData: any;
            this._mongoDao
                .get(id)
                .then(file => {
                    if(!file) return file;

                    fileData = file;
                    console.log('file', file)
                    return this._gCloudDao.get(file.file);
                })
                .then(file => {
                    if(file) fileData.mediaLink = file;

                    resolve(fileData);
                })
                .catch(err => reject(err));
        });
    }

    getMany(id: string): Promise<any> {
        return this._mongoDao.getMany(id);
    }

    update(id: string, data: any): Promise<any> {
        return this._mongoDao.update(id, data);
    }

    simpleCreate(data: any): Promise<any> {
        return this._mongoDao.create(data);
    }

}

export {FileDataManager};
