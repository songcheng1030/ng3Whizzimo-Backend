export default interface ITileBankBase {
    get(id: string): Promise<any>;
    getByUserId(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    create(data: any): Promise<any>;
}
