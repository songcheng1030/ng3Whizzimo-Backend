import Global from "../../../global";
Global.isTest = true;
import { expect } from 'chai';
import  'mocha';
import container from "./../../../inversify.base.config";
import TYPES from "../../../types";
import {Errors} from "../../../app/constants/Errors";
import INameToValueMap from "../../../app/shared/INameToValueMap";
import {PaymentBusinessManager} from "../../../app/businessManagers/impl/PaymentBusinessManager";

// @ts-ignore
const paymentBusinessManager = container.get<PaymentBusinessManager>(TYPES.PaymentBusinessManager);

describe('Payment Business Manager', () => {
    describe('Create Customer function', () => {
        it('should create a new record with a coupon field if there is a valid coupon in the new item', (done) => {
            let item = {
                account_balance: 0,
                address: "444 Test St.",
                firstName: "John",
                lastName: "Test",
                codeDesc: '100 percent'

            };

            paymentBusinessManager
                .createCustomer(item)
                .then((result: any) => {
                    if(result.coupon) {
                        done();
                    } else {
                        done('No coupon field added');
                    }
                })
                .catch((error: any) => done(error));
        });

        it('should create a new record without a coupon field if there is an invalid coupon in the new item', (done) => {
            let item = {
                account_balance: 0,
                address: "444 Test St.",
                firstName: "John",
                lastName: "Test",
                codeDesc: '110 percent'

            };

            paymentBusinessManager
                .createCustomer(item)
                .then((result: any) => {
                    if(!result.coupon) {
                        done();
                    } else {
                        done('No coupon field added');
                    }
                })
                .catch((error: any) => done(error));
        });

        it('should create a new record without a coupon field if there is no coupon in the new item', (done) => {
            let item = {
                account_balance: 0,
                address: "444 Test St.",
                firstName: "John",
                lastName: "Test"
            };

            paymentBusinessManager
                .createCustomer(item)
                .then((result: any) => {
                    if(!result.coupon) {
                        done();
                    } else {
                        done('No coupon field added');
                    }
                })
                .catch((error: any) => done(error));
        });

        it('should throw an error if there is no firstname, lastname and email field', (done) => {
            let item = {
                account_balance: 0,
                address: "444 Test St.",
            };

            paymentBusinessManager
                .createCustomer(item)
                .then(() => done(Errors.noFailure))
                .catch((error: any) => {
                    try {
                        expect(error).to.eq(Errors.missingParametersBody);
                        done();
                    } catch (error){
                        done(error);
                    }
                });
        });

        it('should create a new record if there is a first name and last name but no email', (done) => {
            let item = {
                account_balance: 0,
                address: "444 Test St.",
                firstName: "John",
                lastName: "Test"
            };

            paymentBusinessManager
                .createCustomer(item)
                .then(() => done())
                .catch((error: any) => done(error));
        });

        it('should create a new record if there is an email but no  first name and last name', (done) => {
            let item = {
                account_balance: 0,
                address: "444 Test St.",
                email: 'test@test.com'
            };

            paymentBusinessManager
                .createCustomer(item)
                .then(() => done())
                .catch((error: any) => done(error));
        });

        it('should create a new record if there is an email and a last name but no  first name', (done) => {
            let item = {
                account_balance: 0,
                address: "444 Test St.",
                email: 'test@test.com',
                lastName: 'Smallwood'
            };

            paymentBusinessManager
                .createCustomer(item)
                .then(() => done())
                .catch((error: any) => done(error));
        });

        it('should create a new record if there is an email and a first name but no  last name', (done) => {
            let item = {
                account_balance: 0,
                address: "444 Test St.",
                email: 'test@test.com',
                lastName: 'Eric'
            };

            paymentBusinessManager
                .createCustomer(item)
                .then(() => done())
                .catch((error: any) => done(error));
        });
    });
});
