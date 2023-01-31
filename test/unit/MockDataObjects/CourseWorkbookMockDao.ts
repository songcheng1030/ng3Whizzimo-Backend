import {injectable} from "inversify";
import ICourseWorkbookBase from "../../../app/shared/ICourseWorkbookBase";

@injectable()
class CourseWorkbookMockDao implements ICourseWorkbookBase {
    private db:any[] = [
        {
            _id: "1",
            concept: "new",
            order: 14,
            workbookId: "23DBrUNm0P",
            courseId: "1",
            ownerKey: "WhizzimoAcademy:19"
        },
        {
            _id: "2",
            concept: "new",
            order: 15,
            workbookId: "BTDtTI7BVN",
            courseId: "2",
            ownerKey: "WhizzimoAcademy:19"
        }

    ];

    create(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
           this.db.push(data);
           resolve(data);
        });
    }

    delete(id: string): Promise<any> {
        return undefined;
    }

    deleteByWorkbookId(workbookId: string): Promise<any> {
        return undefined;
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(this.db.find(courseWorkbook => courseWorkbook._id == id));
        });
    }

    getByCourseId(courseId: string): Promise<any> {
        return undefined;
    }

    getMany(id: string): Promise<any> {
        return undefined;
    }

    update(id: string, data: any): Promise<any> {
        return undefined;
    }
    updateByWorkbook(id: string, workbookId: string, data: any): Promise<any> {
        return undefined;
    }

    deleteFromCourseWorkbookByWorkbookId(workbookId: string, courseId: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    getCountByWorkbookId(workbookId: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    getNonMerged(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}

export {CourseWorkbookMockDao};
