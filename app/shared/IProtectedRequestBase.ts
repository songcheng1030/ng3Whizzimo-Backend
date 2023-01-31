export default interface IProtectedRequestBase {
    protectedCreate(data: any, locals: any): Promise<any>;
    protectedUpdate(id: string, data: any, locals: any): Promise<any>;
    protectedDelete(id: string, locals: any): Promise<any>;
    validateOwner(id:string, locals:any): Promise<any>;
}
