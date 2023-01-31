import {injectable} from "inversify";
import IWorkbookBase from "../../../app/shared/IWorkbookBase";

@injectable()
class WorkbookMockDao implements IWorkbookBase {
    private static db:any[] = [
        {
            "_id" : "2",
            "hasPhrase" : false,
            "owner" : "WhizzimoAcademy:147",
            "ownerName" : "Eric Smallwood",
        },
        {
            "_id" : "1",
            "hasPhrase" : false,
            "owner" : "WhizzimoAcademy:147",
            "ownerName" : "Joan Smallwood",
        }
    ];

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            data._id = Date.now().toString();
            WorkbookMockDao.db.push(data);
            resolve(data);
        });
    }

    delete(id: string): Promise<any> {
        return undefined;
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const workbook = WorkbookMockDao.db.find(workbook => workbook._id == id);
            resolve(workbook);
        });
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    getManyById(ids: string[]): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return new Promise(resolve => {
            const index = WorkbookMockDao.db.findIndex(workbook => workbook._id === id);
            WorkbookMockDao.db[index] = {...WorkbookMockDao.db[index], ...data};
            resolve(WorkbookMockDao.db[index]);
        });
    }

}

export {WorkbookMockDao};
