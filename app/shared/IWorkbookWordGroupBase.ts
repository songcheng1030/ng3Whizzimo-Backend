import IRequestBase from "./IRequestBase";

export default interface IWorkbookWordGroupBase extends IRequestBase {
    deleteMany(wordGroupId: string):Promise<any>;
    modify(collectionId: string, itemId: string): Promise<any>;

}
