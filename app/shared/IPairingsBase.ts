export default interface IPairingsBase {
    getAllPairings(): Promise<any>;
    getPairingsFromCompoundSounds(compoundSounds: any[]): Promise<any>;
}
