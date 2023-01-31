export default interface IProxyWorkbookBusinessManager {
    copy(workbookId:string, ownerKey:string, changeName:boolean):Promise<any>;
}
