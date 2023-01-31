export default interface ISecurityMongoDao {
    verifyUser(token:string):Promise<any>;
    createSecurityEntry(data:any):Promise<any>;
    getUserSecurityInfo(userId:string):Promise<any>;
}
