import {DefaultTileBank} from "./DefaultTileBank";
import {DefaultUserSettings} from "./DefaultUserSettings";

function WhizzimoDefaultSettings(data: any): any {
    const signupDate = new Date().toISOString();
    return {
        firebaseId: data.whizzimoId,
        tileBank: DefaultTileBank,
        meta: {
            email: data.email,
            lastname: data.lastname,
            firstname: data.firstname,
            role: data.role,
            signupDate: signupDate,
            referredBy: data.code,
            referredByDesc: data.codeDesc,
            cusID: data.cusID,
            teacher: data.teacher,
            teacherCusID: data.teacherCusID,
            auth0Id: data.auth0Id,
            promo: data.promo,
        },
        userSettings: DefaultUserSettings
    };
}

export default WhizzimoDefaultSettings;
