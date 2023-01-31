import IFileBase from "../shared/IFileBase";

export default interface IFileDataManager extends IFileBase {
    simpleCreate(data: any):Promise<any>;
}
