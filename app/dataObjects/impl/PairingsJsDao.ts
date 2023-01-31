import {injectable} from "inversify";
import {Pairings} from "../../constants/pairings";
import IPairingsBase from "../../shared/IPairingsBase";
import {grapheme} from "../../db";

@injectable()
class PairingsJsDao implements IPairingsBase {
    getAllPairings(): Promise<any> {
        return new Promise(resolve => resolve(Pairings));
    }

    getPairingsFromCompoundSounds(compoundSounds: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            let pairings = compoundSounds.map(compoundSound => {
                // need to get data for paired sounds
                const graphemes = Pairings[compoundSound]
                    .graphemes
                    .map((graphemeSet:any, i:number) => {
                        return graphemeSet.map((grapheme:any, j:number) => {
                            const phoneme = Pairings[compoundSound].phonemes[i][j];
                            return {
                                sound: grapheme,
                                type: Pairings[`${grapheme}-${phoneme}`].type
                            }
                        })
                    });

                return {
                    compoundSound: compoundSound,
                    graphemeSets: graphemes,
                    example: Pairings[compoundSound].example,
                };
            });

            resolve(pairings);
        });
    }

}

export {PairingsJsDao};
