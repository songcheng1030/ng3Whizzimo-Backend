import IRequestBase from "./IRequestBase";

export default interface IUserBase extends IRequestBase{
    getByIdOrEmail(userInfo:string):Promise<any>;
    getByEmail(email:string):Promise<any>;
}

