import WorkbookTilesInitRequest from "../models/WorkbookTilesInitRequest";
import MiniTilesInitRequest from "../models/MiniTilesInitRequest";
import BlackboardInitRequest from "../models/blackboardInitRequest";

export default interface IActivityBusinessManager {
    workbookTilesInit(req: WorkbookTilesInitRequest): Promise<any>;
    blackboardInit(req: BlackboardInitRequest): Promise<any>;
    miniTilesInit(req: MiniTilesInitRequest): Promise<any>;
}
