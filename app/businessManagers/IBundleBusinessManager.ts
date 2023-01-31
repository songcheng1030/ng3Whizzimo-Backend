import IBundleBase from "../shared/IBundleBase";
import IProtectedRequestBase from "../shared/IProtectedRequestBase";

export default interface IBundleBusinessManager extends IBundleBase, IProtectedRequestBase {
    apply(code:string, ownerKey: string):Promise<any>;
    createMany(data: any[]): Promise<any>;
}
