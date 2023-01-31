export default interface IRequestBase {
    create(data: any): Promise<any>;
    get(id: string): Promise<any>;
    getMany(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
}
