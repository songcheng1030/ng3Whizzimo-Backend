import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import {WorkbookBusinessManager} from "../../../app/businessManagers/impl/WorkbookBusinessManager";

// @ts-ignore
const workbookBusinessManager = container.get<WorkbookBusinessManager>(TYPES.WorkbookBusinessManager);

describe('Workbook Business Manager', () => {
    describe('Update function', () => {
        it('should fail if there is owner field is in the data object', (done) => {
            const newWorkbook = {
                "owner" : "WhizzimoAcademy:14",
                "ownerName" : "Eric Smallwood2",
            };
            workbookBusinessManager
                .update('2', newWorkbook)
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.illegalParameters);
                        done();
                    } catch (error){
                        done(error);
                    }
                });
        });
    });
});
