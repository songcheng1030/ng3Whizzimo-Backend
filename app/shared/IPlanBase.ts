export default interface IPlanBase {
    getAll(): Promise<any>;
    getActive(): Promise<any>;
}
