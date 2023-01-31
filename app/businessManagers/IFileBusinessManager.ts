import IFileBase from "../shared/IFileBase";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";
import IFileDataManager from "../dataManagers/IFileDataManager";

export default  interface IFileBusinessManager extends IFileDataManager, IFileBase, IProtectedRequestBase {
    createMany(data: any): Promise<any[]>;
}
