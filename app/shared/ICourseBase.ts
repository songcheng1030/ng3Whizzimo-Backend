import IRequestBase from "./IRequestBase";

export default interface ICourseBase extends IRequestBase {
    getBySharedKey(sharedKey: string): Promise<any>;
}
