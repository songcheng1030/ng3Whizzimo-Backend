export default interface IVersionBase {
    get():Promise<number>;
    update(version: number):Promise<number>;
}
