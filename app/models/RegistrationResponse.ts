import RegistrationRequest from "./RegistrationRequest";

export default class RegistrationResponse extends RegistrationRequest {
    constructor(request: RegistrationRequest) {
        super();

        this.firstName = request.firstName;
        this.lastName = request.lastName;
        this.email = request.email;
        this.password = request.password;
        this.plan = request.plan;
        this.role = request.role;
        this.promo = request.promo;
        this.code = request.code;
        this.codeDesc = request.codeDesc;
        this.username = request.username;
        this.teacher = request.teacher;
    }
    auth0Id: string;
    whizzimoId: string;
    customerId: string;
    socialMediaMessage: string;
    settingsId: any;

}
