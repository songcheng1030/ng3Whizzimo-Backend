import axios from 'axios';
import moment from 'moment';
import { injectable } from "inversify";
import * as randomstring from 'randomstring';
import "reflect-metadata";
import ISecurityBase from "../../shared/ISecurityBase";

@injectable()
class SecurityAuth0Dao implements ISecurityBase {
    resetPassword(emailAddress: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = {
                'client_id': process.env.AUTH0_CLIENTID,
                'email': emailAddress,
                'connection': process.env.AUTH0_CONNECTION
            }
            const options = {
                method: 'POST',
                url: 'https://whizzimoapp.auth0.com/dbconnections/change_password',
                data,
                headers: {
                    authorization: process.env.AUTH0_TOKEN
                }
            }

            axios.request(options)
                .then(result => {
                    resolve(result.data[0]);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getUserByEmailAddress(emailAddress: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: 'https://whizzimoapp.auth0.com/api/v2/users-by-email',
                params: {
                    email: emailAddress
                },
                headers: {
                    authorization: process.env.AUTH0_TOKEN
                }
            }
            axios.request(options)
                .then(result => {
                    resolve(result.data[0]);
                })
                .catch(error => {
                    resolve(null);
                });
        });
    }

    verifyUser(token: string) {
        const that = this;
        //get user id and check token
        return new Promise((resolve, reject) => {
            let response:any = {};
            axios
                .get('https://whizzimoapp.auth0.com/userinfo', {
                    headers: {
                        'Authorization': token.indexOf('Bearer') >= 0 ? token : `Bearer ${token}`
                    }
                })
                .then((user: any) => {
                    response.auth0Id = user.data.sub;
                    response.locals = user.locals;
                    response.expiration = moment().add(1, 'days').format('MMMM Do YYYY, h:mm:ss a');
                    return that.getUser(user.data.sub)
                })
                .then((fulluser: any) => {
                    response.userId = fulluser.data.user_metadata.uid;
                    resolve(response);
                })
                .catch((error: any) => {
                    console.error(error.message);
                    reject(error);
                });
        });
    }

    createUser(body: any):Promise<any> {
        return axios.post('https://whizzimoapp.auth0.com/dbconnections/signup', {
            'connection': process.env.AUTH0_CONNECTION,
            'client_id': process.env.AUTH0_CLIENTID,
            'email': body.email,
            'username': randomstring.generate({length: 10, charset: 'alphanumeric'}),
            'password': body.password,
            'user_metadata': {
                'name': `${body.firstName} ${body.lastName}`,
                'nickname': body.firstName
            }
        });
    }

    getUser(id: string) {
        //get user id and check token
        return axios.get(`https://whizzimoapp.auth0.com/api/v2/users/${id}`, {
            headers: {
                'Authorization': process.env.AUTH0_TOKEN
            }
        });
    }

    searchUsers(field: string, value: string) {
        return axios.get(`https://whizzimoapp.auth0.com/api/v2/users?q=${field}%3A%22${value}%22&search_engine=v3`, {
            headers: {
                'Authorization': process.env.AUTH0_TOKEN
            }
        });
    }

    deleteUser(id: string) {
        return axios
            .delete(`https://whizzimoapp.auth0.com/api/v2/users/auth0|${id}`, {
                headers: {
                    'Authorization': process.env.AUTH0_TOKEN
                }
            });
    }

    updateUser(id: string, updatedUser: any) {
        return axios.patch(`https://whizzimoapp.auth0.com/api/v2/users/auth0|${id}`, updatedUser, {
            headers: {
                'Authorization': process.env.AUTH0_TOKEN
            }
        });
    }

}

export { SecurityAuth0Dao }
