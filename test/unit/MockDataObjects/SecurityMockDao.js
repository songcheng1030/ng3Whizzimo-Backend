"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityMockDao = void 0;
const inversify_1 = require("inversify");
let SecurityMockDao = class SecurityMockDao {
    constructor() {
        this.db = [
            {
                "id": 1,
                "email": "john.doe@gmail.com",
                "email_verified": false,
                "username": "johndoe",
                "phone_number": "+199999999999999",
            },
            {
                "id": 2,
                "email": "john.doe@gmail.com",
                "email_verified": false,
                "username": "johndoe",
                "phone_number": "+199999999999999",
            },
        ];
    }
    createUser(body) {
        return new Promise((resolve, reject) => {
            const idSort = (a, b) => {
                if (a.id < b.id)
                    return 1;
                if (a.id > b.id)
                    return -1;
                return 0;
            };
            const largestId = this.db.sort(idSort)[0].id;
            body.id = largestId + 1;
            body.user_id = Date.now().toString();
            this.db.push(body);
            let result = {};
            result.data = Object.assign({}, body);
            resolve(result);
        });
    }
    deleteUser(id) {
        return undefined;
    }
    getUser(id) {
        return new Promise((resolve, reject) => {
            const user = this.db.find(user => user.id === id);
            resolve(user);
        });
    }
    searchUsers(field, value) {
        return undefined;
    }
    updateUser(id, updatedUser) {
        return new Promise(resolve => {
            const index = this.db.findIndex((user) => {
                return user.user_id === id;
            });
            this.db[index] = Object.assign(Object.assign({}, this.db[index]), updatedUser);
            resolve(null);
        });
    }
    verifyUser(token) {
        return undefined;
    }
    getUserByEmailAddress(emailAddress) {
        return Promise.resolve(undefined);
    }
    resetPassword(emailAddress) {
        return Promise.resolve(undefined);
    }
};
SecurityMockDao = __decorate([
    inversify_1.injectable()
], SecurityMockDao);
exports.SecurityMockDao = SecurityMockDao;
//# sourceMappingURL=SecurityMockDao.js.map
