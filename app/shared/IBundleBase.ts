import IRequestBase from "./IRequestBase";

export default interface IBundleBase extends IRequestBase {
    create(data: any): Promise<any>;
    delete(id: string): Promise<any>;
    get(id: string): Promise<any>;
    getByCode(code: string): Promise<any>;
    getMany(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
}
