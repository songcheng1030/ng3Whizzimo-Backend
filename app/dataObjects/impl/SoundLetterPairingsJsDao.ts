import {injectable} from "inversify";
import ISoundLetterPairingsJsDao from "../ISoundLetterPairingsJsDao";
import {graphemes} from "../../constants/graphemes";
import {Pairings} from "../../constants/pairings";

@injectable()
class SoundLetterPairingsJsDao implements ISoundLetterPairingsJsDao {
    getSoundLetterPairings(): Promise<any> {
        return new Promise((resolve, reject) => {
            let letters = Object.keys(graphemes);

            let soundLetterPairings = letters.map(letter => {
                return {
                    letter: letter,
                    examples: []
                }
            });

            try {
                soundLetterPairings = soundLetterPairings.map(slp => {
                    let phonemes = graphemes[slp.letter].phonemes;
                    phonemes.forEach((phoneme: any) => {
                        const pairing = Pairings[`${slp.letter}-${phoneme}`];
                        if(pairing) {
                            const newSlp = {
                                name: Pairings[`${slp.letter}-${phoneme}`].example,
                                value: `${slp.letter}-${phoneme}`,
                                form: Pairings[`${slp.letter}-${phoneme}`].form,
                                type: Pairings[`${slp.letter}-${phoneme}`].type
                            };
                            slp.examples.push(newSlp);
                        } else {
                            console.log(`missing pairing: ${slp.letter}-${phoneme}`);
                        }

                    });

                    return slp;
                });

                resolve(soundLetterPairings);
            } catch (error) {
                console.log(error.message)
            }



        });
    }

}

export {SoundLetterPairingsJsDao};
