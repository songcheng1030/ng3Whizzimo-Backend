"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("../../../global"));
global_1.default.isTest = true;
const chai_1 = require("chai");
require("mocha");
const inversify_base_config_1 = __importDefault(require("./../../../inversify.base.config"));
const types_1 = __importDefault(require("../../../types"));
const Errors_1 = require("../../../app/constants/Errors");
// @ts-ignore
const paymentBusinessManager = inversify_base_config_1.default.get(types_1.default.PaymentBusinessManager);
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
                .then((result) => {
                if (result.coupon) {
                    done();
                }
                else {
                    done('No coupon field added');
                }
            })
                .catch((error) => done(error));
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
                .then((result) => {
                if (!result.coupon) {
                    done();
                }
                else {
                    done('No coupon field added');
                }
            })
                .catch((error) => done(error));
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
                .then((result) => {
                if (!result.coupon) {
                    done();
                }
                else {
                    done('No coupon field added');
                }
            })
                .catch((error) => done(error));
        });
        it('should throw an error if there is no firstname, lastname and email field', (done) => {
            let item = {
                account_balance: 0,
                address: "444 Test St.",
            };
            paymentBusinessManager
                .createCustomer(item)
                .then(() => done(Errors_1.Errors.noFailure))
                .catch((error) => {
                try {
                    chai_1.expect(error).to.eq(Errors_1.Errors.missingParametersBody);
                    done();
                }
                catch (error) {
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
                .catch((error) => done(error));
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
                .catch((error) => done(error));
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
                .catch((error) => done(error));
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
                .catch((error) => done(error));
        });
    });
});
//# sourceMappingURL=PaymentBusinessManager.spec.js.map