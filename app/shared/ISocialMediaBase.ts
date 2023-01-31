export default interface ISocialMediaBase {
    sendMessage(message: string): Promise<any>;
}