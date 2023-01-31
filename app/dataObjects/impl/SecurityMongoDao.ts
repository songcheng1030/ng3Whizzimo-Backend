import {injectable} from "inversify";
import ISecurityMongoDao from "../ISecurityMongoDao";
import {security} from "../../db";

@injectable()
class SecurityMongoDao implements ISecurityMongoDao {
    verifyUser(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            security
                .find({token: token})
                .then((data: any) => {
                    if(data.length === 0) {
                        return resolve(null);
                    }
                    resolve(data[0]);
                })
                .catch((error: any) => {
                    reject(error)
                });
        })
    }

    createSecurityEntry(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getUserSecurityInfo(data.userId)
                .then((result: any) => {
                    if(!result) {
                        return security.insert(data);
                    }

                    return security.update({userId: data.userId}, {$set: data});
                })
                .then(() => resolve(data))
                .catch((error: any) => {
                    reject(error)
                });
        })
    }

    getUserSecurityInfo(userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            security.find({userId: userId})
                .then((result: any[]) => {
                   if(result.length === 0) {
                       return resolve(null);
                   }

                   resolve(result[0]);
                })
                .catch((error: any) => reject(error));
        });
    }
}

export {SecurityMongoDao};
