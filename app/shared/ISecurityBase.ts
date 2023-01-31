export default interface ISecurityBase {
    verifyUser(token: string): Promise<any>;
    createUser(body: any): Promise<any>;
    getUser(id: string): Promise<any>;
    getUserByEmailAddress(emailAddress: string): Promise<any>;
    searchUsers(field: string, value: string): Promise<any>;
    updateUser(id: string, updatedUssr: any): Promise<any>;
    deleteUser(id: string): Promise<any>;
    resetPassword(emailAddress: string): Promise<any>;
}
