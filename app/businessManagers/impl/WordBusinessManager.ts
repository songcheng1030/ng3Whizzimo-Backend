import {inject, injectable} from "inversify";
import IWordBusinessManager from "../IWordBusinessManager";
import IWordDataManager from "../../dataManagers/IWordDataManager";
import TYPES from "../../../types";
import {Pairings} from "../../constants/pairings";
import {DefaultUserSettings} from "../../constants/DefaultUserSettings";
import IUserSettingsBusinessManager from "../IUserSettingsBusinessManager";
import IPaymentBusinessManager from "../IPaymentBusinessManager";
import ISettingsBusinessManager from "../ISettingsBusinessManager";
import { ConsoleLogger } from "@slack/client/dist/logger";

@injectable()
class WordBusinessManager implements IWordBusinessManager {

    private _wordDataManager:IWordDataManager;
    private _settingsBusinessManager: ISettingsBusinessManager;
    private _paymentBusinessManager: IPaymentBusinessManager;

    constructor(
       @inject(TYPES.WordDataManager) wordDataManager:IWordDataManager,
       @inject(TYPES.SettingsBusinessManager) settingsBusinessManager:ISettingsBusinessManager,
       @inject(TYPES.PaymentBusinessManager) paymentBusinessManager:IPaymentBusinessManager
    ){
        this._wordDataManager = wordDataManager;
        this._settingsBusinessManager = settingsBusinessManager;
        this,this._paymentBusinessManager = paymentBusinessManager;
    }

    getWordsByIds(ids: number[]): Promise<any> {
        if (ids.length === 0) {
            return Promise.resolve([]);
        }

        return this._wordDataManager.getWordsByIds(ids);
    }

    get(filter: any): Promise<any> {
        return this._wordDataManager.get(filter);
    }

    getUsingCustomerId(filter: any, customerId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._paymentBusinessManager
                .getCustomer(customerId)
                .then(customer => {
                    if(customer) {
                        filter.planType = customer.subscriptions.data[0].plan.name;
                    }

                     return this.get(filter);
                })
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async getTiles(userId: string, word:any, showAffixTiles: boolean) {
        const settings:any = await this._settingsBusinessManager.getByUserId(userId);
        var wordPairings: any[] = this.wordToPairings(word, settings.length === 0 ? DefaultUserSettings.compoundSounds: settings.compoundSounds);
        let tileKeys: any[] = [];
        let wordArray: any[] = [];

        // Run through each Pairing in the word
        var currentLetters = "";
        if(showAffixTiles){
            for(var j = 0; j < word.affixes.length; j++){
                var affix = word.affixes[j];
                var wordLength =  affix.indexOf('(') < 0 ? affix.length : affix.indexOf('(');
                var affixWord = affix.substring(0, wordLength);
                var type = affix.substring(wordLength + 1, affix.indexOf(')'));
                switch(type){
                    case 'p':
                        tileKeys.push('tiles.pref.' + affixWord);
                        break;
                    case 's':
                        tileKeys.push('tiles.suff.' + affixWord);
                        break;
                    case 'r':
                        tileKeys.push('tiles.roots.' + affixWord);
                        break;
                    case 'l':
                        tileKeys.push('tiles.LatinChameleonPrefixes.' + affixWord);
                        break;
                    case 'g':
                        tileKeys.push('tiles.GreekCombiningForms.' + affixWord);
                        break;
                    case '_':
                        tileKeys.push('tiles.sym._');
                    default:
                        //match word spelling with word pairing to get the correct parings length
                        let len = 0,
                            start  = 0;
                        let pairingsLetters = wordPairings.map(pairing => {
                            return pairing.indexOf('--') >= 0 ? '-': pairing.substring(0, pairing.indexOf('-'));
                        });

                        //remove previous letters from Pairings, so that we are only left with the current ones
                        for(var k = 0; k < currentLetters.length; k++){
                            let currentLetter = currentLetters[k];
                            let matchIndex = pairingsLetters.findIndex(letter => {
                                return letter[0] === currentLetter;
                            });

                            let pairingLen = pairingsLetters[matchIndex].length;
                            pairingsLetters.splice(matchIndex, 1);

                            k += pairingLen - 1;
                            start++;
                        }
                        //match letter with first letter of the next group in Pairings, then remove that entry from Pairings
                        //increment k if necessary to take into account groups of multiple letters
                        if(wordLength > 1) {
                            for(k = 0; k < wordLength; k++){
                                let pairingIndex = pairingsLetters.findIndex(pairing => {
                                    return pairing[0] === affixWord[k];
                                });

                                len++;
                                if(pairingIndex >= 0) {
                                    k += pairingsLetters[pairingIndex].length - 1;
                                    pairingsLetters.splice(0,1);

                                }

                            }
                        } else {
                            len++
                        }

                        for (i = start; i < len + start; i++) {
                            this.parseTile(i, wordPairings, wordArray, tileKeys);
                        }
                        break;
                }
                currentLetters += affixWord;
            }
        }else{
            for (var i = 0; i < wordPairings.length; i++) {
                this.parseTile(i, wordPairings, wordArray, tileKeys);
            }
        }

        // Clear blanks from the wordArray (caused by silent "h"s)
        wordArray = wordArray.filter(function(item){
            if (item !== '') { return item }
        });
        // Clear blanks from the tileKeys (caused by silent "h"s)
        tileKeys = tileKeys.filter(function(item){
            if (item !== '') { return item }
        });

        return tileKeys;
    }

    private parseTile(i:number, wordPairings:any[], wordArray:any[], tileKeys:any[]){
        if(!wordPairings[i]) {
            return;
        }

        var splitPairingArray = wordPairings[i].indexOf('--') >= 0 ? ['-', 'SIL'] :wordPairings[i].split('-');


        // Account for linkedSilent sounds if flagged

            wordArray[i] = splitPairingArray[0];
            try {
                var tileKeyEquiv = "";
                if(splitPairingArray[0] == '1')tileKeyEquiv = 'tiles.blank.lightblue';
                else if(splitPairingArray[0] == '2')tileKeyEquiv = 'tiles.blank.clear';
                else tileKeyEquiv = 'tiles.'+Pairings[wordPairings[i]].type+'.'+splitPairingArray[0];

                tileKeys.push(tileKeyEquiv);
            }
            catch(error) {
                void 0;
                void 0;
            }
    }

    private wordToPairings(word:any, userSettings: any) {
        let wordPairings = [];
        // Grab the Pairings for the word
        let pairings = word['attributes'] ? word['attributes']['compoundPairings'] : word['compoundPairings'];
        // For each pairing, check for compounds
        if (pairings) {
            for ( let n = 0; n < pairings.length; n++ ) {
                // Fix the pairing of any upper/lower case issues
                let splitPairingArray = pairings[n].split('-');
                let pairing = pairings[n].indexOf('--') >= 0 ? pairings[n] : splitPairingArray[0].toLowerCase() + '-' + splitPairingArray[1].toUpperCase();

                // Check for the pairing in Pairings
                if (Pairings[pairing]) {
                    let compoundIndex;
                    // Get the index of the user specified Compound Sound
                    try {
                        if (userSettings[pairing]) {
                            compoundIndex = userSettings[pairing];
                        }
                        else {
                            // Pairing Has No Other Compound Sounds!
                            compoundIndex = 0;
                        }
                    }
                    catch(error) {
                        console.log("Not enough time for userSettings to load");
                        compoundIndex = 0;
                    }

                    if (typeof(Pairings[pairing].graphemes[compoundIndex]) == 'string') {
                        var pairingEquiv = Pairings[pairing].graphemes[compoundIndex]+'-'+Pairings[pairing].phonemes[compoundIndex];
                        wordPairings.push(pairingEquiv);
                    }
                    else {
                        if(Pairings[pairing].graphemes[compoundIndex]) {
                            for (var i = 0, len = Pairings[pairing].graphemes[compoundIndex].length; i<len; i++) {
                                var pairingEquiv = Pairings[pairing].graphemes[compoundIndex][i]+'-'+Pairings[pairing].phonemes[compoundIndex][i]
                                wordPairings.push(pairingEquiv);
                            }
                        }
                    }
                }
                else {
                    void 0;
                }
            }
        } else {
            wordPairings = word.word
                .split('')
                .map((letter: any) => Object.keys(Pairings).find(pairing => pairing.indexOf(letter + '-') >= 0));
        }
        return wordPairings;
    }

    async getTilesByWordIds(userId: string, wordIds: any[], showAffixTiles: boolean): Promise<any> {
        if(wordIds.length === 0) {
            return Promise.resolve([]);
        }

        let words = await this._wordDataManager.getWordsByIds(wordIds);
        words = words.filter((word: any) => word);
        let tiles: any[] = [];
        for(let i = 0; i < words.length; i++) {
            const word = words[i];
            tiles.push(await this.getTiles(userId, word, showAffixTiles));
        }

        return tiles;
    }

}

export {WordBusinessManager};
