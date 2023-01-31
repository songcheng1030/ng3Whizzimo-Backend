import {injectable} from "inversify";
import axios from 'axios';
import IFileBase from "../../shared/IFileBase";
import {Storage} from "@google-cloud/storage";
import * as fs from "fs";

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEYFILE_URI
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

@injectable()
class FileGCloudDao implements IFileBase {
    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const gcsFile = bucket.file(data.name);
            let response: any;
            bucket
                .upload(`./uploads/${data.name}`, {resumable: false}) // upload file to GCloud
                .then((result: any) => {
                    response = result;
                    return gcsFile.makePublic();
                }) // Make it public
                .then((res: any) => {
                    resolve(response)
                })
                .catch(err => {
                    reject(err)
                });
        });
    }

    delete(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }


    get(id: string): Promise<any> {
        return new Promise( async (resolve, reject) => {
            console.log('bucket name', process.env.GCLOUD_BUCKET_NAME)
            console.log('id', id)
            const response = await bucket.getFiles({prefix: id})
            console.log('response', response)

            //@ts-ignore
            const metadata = await response[0][0].getMetadata()

            resolve(metadata[0].mediaLink);
        });
    }


    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }

}

export {FileGCloudDao};
