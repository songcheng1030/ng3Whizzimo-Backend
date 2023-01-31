import {inject, injectable} from "inversify";
import IWorkbookFileBusinessManager from "../IWorkbookFileBusinessManager";
import TYPES from "../../../types";
import IWorkbookFileDataManager from "../../dataManagers/IWorkbookFileDataManager";
import IFileBusinessManager from "../IFileBusinessManager";
import ILessonPlanStepDataManager from "../../dataManagers/ILessonPlanStepDataManager";

@injectable()
class WorkbookFileBusinessManager implements IWorkbookFileBusinessManager {
    private _workbookFileDataManager:IWorkbookFileDataManager;
    private _fileBusinessManager:IFileBusinessManager;
    private _lessonPlanStepDataManager:ILessonPlanStepDataManager;

    constructor(
        @inject(TYPES.WorkbookFileDataManager) workbookFileDataManager:IWorkbookFileDataManager,
        @inject(TYPES.FileBusinessManager) fileBusinessManager:IFileBusinessManager,
        @inject(TYPES.LessonPlanStepBusinessManager) lessonPlanStepDataManager:ILessonPlanStepDataManager
    ){
        this._workbookFileDataManager = workbookFileDataManager;
        this._fileBusinessManager = fileBusinessManager;
        this._lessonPlanStepDataManager = lessonPlanStepDataManager;
    }

    async copy(workbookId: string, newWorkbookId: string, ownerKey: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let workbookFileCopy:any = {};
            this._workbookFileDataManager
                .getMany(workbookId)
                .then((workbookFiles: any) => {
                    if(workbookFiles.length === 0) return null;
                    workbookFiles[0]._id = newWorkbookId
                    workbookFileCopy = workbookFiles;

                    let requests:any[] = [];

                    workbookFiles.forEach((file:any) => {
                        requests.push(this._fileBusinessManager.get(file.fileId));
                    });

                    let copiedFilesRequests = workbookFiles[0].files.map((file: any) => {
                        file.oldId = file._id;
                        delete file._id;

                        file.ownerKey = ownerKey;
                        return this._fileBusinessManager.simpleCreate(file);
                    });

                    return Promise.all(copiedFilesRequests);
                })
                .then(copiedFiles => {
                    if(!copiedFiles) return null;

                    // match workbook files with new copied files
                    workbookFileCopy[0].files.forEach((copiedWorkbookFile:any) => {
                        const matchedFile: any = copiedFiles.find((copiedFile:any) => {
                            // if this was copied from the same acccount use id instead of oldId
                            const idField = copiedFile.oldId || copiedFile._id;
                            return idField.toString() === copiedWorkbookFile.oldId || copiedWorkbookFile._id;
                        });
                        copiedWorkbookFile.fileId = matchedFile ? matchedFile._id : null;
                    });

                    return this._workbookFileDataManager.clone(workbookFileCopy[0]);
                })
                .then(() => {
                    resolve("OK")
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(!data.workbookId || !data.fileId) {
                return reject('Request body missing required parameters.');
            }

            this._fileBusinessManager.get(data.fileId)
                .then((result: any) => {
                    if(result === null) {
                        reject('File Does Not Exist');
                    }

                    return this._workbookFileDataManager.create(data);
                })
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
        return this._workbookFileDataManager.delete(id);
    }
    modify(workbookId: string, id: string): Promise<any> {
        return this._workbookFileDataManager.modify(workbookId, id);
    }

    get(id: string): Promise<any> {
        return this._workbookFileDataManager.get(id);
    }

    getMany(id: string): Promise<any> {
        return this._workbookFileDataManager.getMany(id);
    }
    clone(data: any): Promise<any> {
        return this._workbookFileDataManager.clone(data)
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._workbookFileDataManager.update(id, data)
                .then((result: any) => {
                    const fileData = {...data.file, _id:data.fileId};
                    return this._lessonPlanStepDataManager.updateFilesByWorkbookId(data.workbookId, fileData);
                })
                .then((result: any) => {
                    return resolve(result)
                })
                .catch((error: any) => reject(error));
        });
    }

    deleteMany(fileId: string): Promise<any> {
        return this._workbookFileDataManager.deleteMany(fileId);
    }

}

export {WorkbookFileBusinessManager};
