import {injectable} from "inversify";
import ISecurityBase from "../../../app/shared/ISecurityBase";

@injectable()
class SecurityMockDao implements ISecurityBase {
    private db:any[] =[
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

    createUser(body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const idSort = (a:any, b:any) => {
                if(a.id < b.id) return 1;
                if(a.id > b.id) return -1;
                return 0;
            };

            const largestId = this.db.sort(idSort)[0].id;

            body.id = largestId + 1;

            body.user_id = Date.now().toString();

            this.db.push(body);

            let result:any = {};
            result.data = {...{}, ...body};
            resolve(result);
        });
    }

    deleteUser(id: string): Promise<any> {
        return undefined;
    }

    getUser(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const user = this.db.find(user => user.id === id);
            resolve(user);
        });
    }

    searchUsers(field: string, value: string): Promise<any> {
        return undefined;
    }

    updateUser(id: string, updatedUser: any): Promise<any> {
        return new Promise(resolve => {
           const index = this.db.findIndex((user:any) => {
               return user.user_id === id
           });

           this.db[index] = {...this.db[index], ...updatedUser};

           resolve(null);
        });
    }

    verifyUser(token: string): Promise<any> {
        return undefined;
    }

    getUserByEmailAddress(emailAddress: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    resetPassword(emailAddress: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}

export {SecurityMockDao};
