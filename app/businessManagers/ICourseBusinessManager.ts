import ICourseBase from "../shared/ICourseBase";

export default interface ICourseBusinessManager extends ICourseBase {
    copy(courseId:string, ownerKey:string, changeName: boolean):Promise<any>;
    validateCourseOwner(courseId: string, userId: string, isAdmin: boolean): Promise<any>;
}
