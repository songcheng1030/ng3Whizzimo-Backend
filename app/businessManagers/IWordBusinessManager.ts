import IWordBase from "../shared/IWordBase";

export default interface IWordBusinessManager extends IWordBase {
    getUsingCustomerId(filter: any, customerId: string): Promise<any>;
    getTiles(userId: string, word:any, showAffixTiles: boolean):Promise<any>;
    getTilesByWordIds(userId: string, wordIds: any[], showAffixTiles: boolean):Promise<any>;
}
