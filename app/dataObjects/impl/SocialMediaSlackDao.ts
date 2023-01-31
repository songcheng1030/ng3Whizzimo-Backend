import ISocialMediaBase from "../../shared/ISocialMediaBase";
import {injectable} from "inversify";
const { IncomingWebhook } = require('@slack/client');
console.log('environment webhook', process.env)

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOKURL);

@injectable()
class SocialMediaSlackDao implements ISocialMediaBase {
    sendMessage(message: string): Promise<any> {
        return new Promise((resolve, reject) => {
           webhook.send(message, (err: any, res: any) => {

              resolve(null);
           });
        });
    }
}

export {SocialMediaSlackDao};
