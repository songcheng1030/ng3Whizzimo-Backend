import RegistrationRequest from "../models/RegistrationRequest";

export default interface IRegistrationBusinessManager {
    register(user: RegistrationRequest): Promise<any>;
    createFirstCourse(courseInfo: any): Promise<any>;
}
