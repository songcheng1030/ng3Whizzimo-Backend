import {injectable} from "inversify";
import ISocialMediaBase from "../../../app/shared/ISocialMediaBase";

@injectable()
class SocialMediaMockDao implements ISocialMediaBase{
    sendMessage(message: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }

}

export {SocialMediaMockDao};
