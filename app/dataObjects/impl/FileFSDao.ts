import IFileBase from "../../shared/IFileBase";
import * as fs from 'fs';
import {injectable} from "inversify";

@injectable()
class FileFSDao implements IFileBase {
    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(`uploads/${data.name}`, data.file, {encoding: 'base64'},
                (err: any) => {
                if(err) return reject(err);
                resolve('File Created Successfully');
            });
        });
    }

    delete(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err: any) => {
                if(err) reject(err);
                else resolve('success');
            })
        });
    }

    get(id: string): Promise<any> {
        return undefined;
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }

}

export {FileFSDao};
