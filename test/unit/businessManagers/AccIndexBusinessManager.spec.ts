import Global from "../../../global";
Global.isTest = true;
import { expect, assert  } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {AccIndexBusinessManager} from "../../../app/businessManagers/impl/AccIndexBusinessManager";
import {Errors} from "../../../app/constants/Errors";

// @ts-ignore
const accIndexBusinessManager = container.get<AccIndexBusinessManager>(TYPES.AccIndexBusinessManager);

describe('Get function', () => {

});
