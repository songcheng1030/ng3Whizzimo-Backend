export default interface IWordBase {
    get(filter:any):Promise<any>;
    getWordsByIds(ids: number[]):Promise<any>;

}
