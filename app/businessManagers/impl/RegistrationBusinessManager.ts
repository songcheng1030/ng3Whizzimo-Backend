import IRegistrationBusinessManager from "../IRegistrationBusinessManager";
import {inject, injectable} from "inversify";
import TYPES from "../../../types";
import IRegistrationDataManager from "../../dataManagers/IRegistrationDataManager";
import ISecurityBusinessManager from "../ISecurityBusinessManager";
import RegistrationRequest from "../../models/RegistrationRequest";
import RegistrationResponse from "../../models/RegistrationResponse";
import IPaymentBusinessManager from "../IPaymentBusinessManager";
import IUserBusinessManager from "../IUserBusinessManager";
import IStudentBusinessManager from "../IStudentBusinessManager";
import IAccIndexBusinessManager from "../IAccIndexBusinessManager";
import ICourseBusinessManager from "../ICourseBusinessManager";
import ISocialMediaBusinessManager from "../ISocialMediaBusinessManager";
import ISettingsBusinessManager from "../ISettingsBusinessManager";

@injectable()
class RegistrationBusinessManager implements IRegistrationBusinessManager {
    private _registrationDatamanager:IRegistrationDataManager;
    private _securityBusinessManager:ISecurityBusinessManager;
    private _settingsBusinessManager:ISettingsBusinessManager;
    private _paymentBusinessManager:IPaymentBusinessManager;
    private _userBusinessManager:IUserBusinessManager;
    private _studentBusinessManager:IStudentBusinessManager;
    private _accIndexBusinessManager:IAccIndexBusinessManager;
    private _courseBusinessmanager:ICourseBusinessManager;
    private _socialMediaBusinessManager:ISocialMediaBusinessManager;

    public constructor(
        @inject(TYPES.RegistrationDataManager) registrationDataManager:IRegistrationDataManager,
        @inject(TYPES.SecurityBusinessManager) securityBusinessManager:ISecurityBusinessManager,
        @inject(TYPES.SettingsBusinessManager) settingsBusinessManager:ISettingsBusinessManager,
        @inject(TYPES.PaymentBusinessManager) paymentBusinessmanager:IPaymentBusinessManager,
        @inject(TYPES.UserBusinessManager) userBusinessManager: IUserBusinessManager,
        @inject(TYPES.StudentBusinessManager) studentBusinessManager:IStudentBusinessManager,
        @inject(TYPES.AccIndexBusinessManager) accIndexBusinessManager:IAccIndexBusinessManager,
        @inject(TYPES.CourseBusinessManager) courseBusinessManager:ICourseBusinessManager,
        @inject(TYPES.SocialMediaBusinessManager) socialMediaBusinessManager:ISocialMediaBusinessManager,
    ) {
        this._registrationDatamanager = registrationDataManager;
        this._securityBusinessManager = securityBusinessManager;
        this._settingsBusinessManager = settingsBusinessManager;
        this._paymentBusinessManager = paymentBusinessmanager;
        this._userBusinessManager = userBusinessManager;
        this._studentBusinessManager = studentBusinessManager;
        this._accIndexBusinessManager = accIndexBusinessManager;
        this._courseBusinessmanager = courseBusinessManager;
        this._socialMediaBusinessManager = socialMediaBusinessManager;
    }

    readonly classDefinition: string = 'students';

    async register(user: RegistrationRequest):Promise<any> {
        return new Promise((resolve:any, reject:any) => {
            let responseObj: RegistrationResponse = new RegistrationResponse(user);
            this._securityBusinessManager.createUser(responseObj)
                .then((result: any) => {
                    responseObj.auth0Id = result.data.user_id;
                    return this._accIndexBusinessManager.update();
                })
                .then((result:any) => {
                    responseObj.whizzimoId = `WhizzimoAcademy:${parseInt(result.accIndex)}`;
                    return this._securityBusinessManager.updateUser(responseObj.auth0Id, {user_metadata: {teacheruid: responseObj.whizzimoId}});
                })
                .then(() => this._settingsBusinessManager.create(responseObj.whizzimoId, 'Default'))
                .then((result) => {
                    responseObj.settingsId = result._id;
                    return this._settingsBusinessManager.updateCurrent(result._id, responseObj.whizzimoId)
                })
                .then(() => this._paymentBusinessManager.createCustomer(responseObj))
                .then((result: any) => {
                    responseObj.customerId = result.toString();
                    return this._securityBusinessManager.updateUser(responseObj.auth0Id, {user_metadata: {cusID: result, uid: responseObj.whizzimoId}})
                })
                .then(() => this._userBusinessManager.create({ownerKey: responseObj.whizzimoId, email: user.email}))
                .then(async (result: any) => {
                    if(responseObj.teacher) {
                        await this._studentBusinessManager.create({userId: responseObj.whizzimoId, teacherId: responseObj.teacher});
                    }

                    return null;
                })
                .then(() => {
                    // create users first course if the user is not a student
                    if(responseObj.plan !== 'Student') {
                        const courseName = `${responseObj.firstName} ${responseObj.lastName}`;
                        return this._courseBusinessmanager.create({
                            teacherKey: responseObj.whizzimoId,
                            classDefinition: this.classDefinition,
                            courseName: courseName,
                            notes: '',
                            type: 'Default/Practice Student',
                        });

                        //todo: Figure out what to do about referencing the course inside the user object
                    }
                })
                .then(() => {
                    // post to slack that a new user just registered

                    let msg = `${responseObj.firstName} ${responseObj.lastName} just registered for Whizzimo from Whizzimo.com as a ${responseObj.role}`;

                    // Add a Referral Code
                    if (responseObj.code) {
                        msg += `using referral code: ${responseObj.code}!`;
                    } else {
                        msg += '!';
                    }

                    responseObj.socialMediaMessage = msg;

                    return this._socialMediaBusinessManager.sendMessage(msg);
                })
                .then(() => {
                    // completed registration successfully
                    resolve({
                        data: {
                            auth0Id: responseObj.auth0Id,
                            whizzimoId: responseObj.whizzimoId,
                            stripeId: responseObj.customerId,
                            socialMediaMessage:  responseObj.socialMediaMessage
                        }
                    });
                })
                .catch((error: any) => {
                        //remove from auth0
                        if(responseObj.auth0Id) {
                            this._securityBusinessManager.deleteUser(responseObj.auth0Id);
                        }

                        if (error.response.data.description === "The user already exists.") {
                            error.response.data.description = "User already exists with this email address."
                        }

                        //remove from mongodb
                        if(responseObj.whizzimoId){
                            this._userBusinessManager.delete(responseObj.whizzimoId);
                            this._studentBusinessManager.delete(responseObj.whizzimoId);
                        }

                        //remove from stripe
                        if(responseObj.customerId){
                            this._paymentBusinessManager.deleteCustomer(responseObj.customerId);
                        }

                        reject(error.response ? error.response.data : error);
                    }
                );
        });
    }

    async createFirstCourse(courseInfo: any) {
        await this._courseBusinessmanager.create({
            teacherKey: courseInfo.whizzimoId,
            classDefinition: 'students',
            courseName: courseInfo.firstName + " " + courseInfo.lastName,
            notes: '',
            type: 'Default/Practice Student',
        });

        return 'OK';
    }
}

export {RegistrationBusinessManager};
