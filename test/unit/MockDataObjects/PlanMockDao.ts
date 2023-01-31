import IPlanBase from "../../../app/shared/IPlanBase";

class PlanMockDao implements IPlanBase {
    getActive(): Promise<any> {
        return undefined;
    }

    getAll(): Promise<any> {
        return undefined;
    }

}

export {PlanMockDao};
