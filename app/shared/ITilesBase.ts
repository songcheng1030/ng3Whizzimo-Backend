export default interface ITilesBase {
    query(query: string): Promise<any>;
    get(): Promise<any>;
}
