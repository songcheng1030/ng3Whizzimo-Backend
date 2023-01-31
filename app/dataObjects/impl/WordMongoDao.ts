import IWordMongoDao from "../IWordMongoDao";
import {graphemes} from '../../constants/graphemes';
import {syllableTypeKeys} from "../../constants/syllableTypeKeys";
import {syllableDivisions} from "../../constants/syllableDivisions";
import {Pairings} from "../../constants/pairings";
import {words} from "../../db";
import {injectable} from "inversify";
import IWordBase from "../../shared/IWordBase";
import * as fs from "fs";
import {uniq, difference} from 'lodash';

@injectable()
class WordMongoDao implements IWordBase {
    getWordsByIds(ids: number[]): Promise<any> {
        const $or = ids.map(id => ({wordid: id}));
        return new Promise((resolve, reject) => {
            words
                .find({wordid: {$in: ids}})
                .then((words: any) => {
                    const reOrderd = ids.map(wordId => {
                        return words.find((word: any) => {
                            return word.wordid === wordId
                        })
                    });
                    resolve(reOrderd);
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    get(filter: any): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            let query:any = {};
            const $exactOr = [];

            //required
            if(typeof filter.isPhonetic === 'undefined') {
                return reject('required fields missing');
            }

            query.$and = filter.isPhonetic ? [{isPhonetic: filter.isPhonetic}] : [];


            if(typeof filter.isNonsense  !== 'undefined') {
                if(filter.isNonsense.includes) {
                    if(filter.isNonsense.includes('real') && !filter.isNonsense.includes('nonsense')){
                        query.$and.push({isNonsense: false});
                    }
                    if(filter.isNonsense.includes('nonsense') && !filter.isNonsense.includes('real')){
                        query.$and.push({isNonsense: true});
                    }
                } else {
                    if(filter.nonsense === true) {
                        query.$and.push({isNonsense: true});
                    }

                    if(filter.nonsense === false) {
                        query.$and.push({isNonsense: false});
                    }
                }

            }
            // Exact Tiles Filter
            // exclude any graphemes not in the list
            if (filter.exactTiles) {
                const tiles: any = [];
                let includeCompoundParings:any = [];
                let includeIntermediateParings:any = [];
                filter.exactTiles.forEach((tile: any) =>
                {
                    if(tile.examples) {
                        tile.examples.forEach((example: any)=>{
                            if(example.value && example.checked){
                                tiles.push(example.value);
                            }
                            if(example.form === 'compound' && example.checked){
                                includeCompoundParings.push(example.value);
                            }
                            if(example.form === 'intermediate' && example.checked){
                                includeIntermediateParings.push(example.value);
                            }
                        })
                    } else {
                        tiles.concat(filter.exactTiles);
                    }

                });
                if (tiles && tiles.length > 0) {
                    let anywherePairings = this.pairingsArray.filter(pairing =>{
                        if(!tiles.includes(pairing.pairing)){
                            return true;
                        }
                    });
                    if(anywherePairings.length > 0){
                        anywherePairings = anywherePairings.map(pairing => pairing.pairing);
                        
                        // if filter includes compound or intermediate
                        if(includeCompoundParings.length > 0 || includeIntermediateParings.length > 0){
                            if(tiles.length > 0){
                                if(includeCompoundParings.length > 0){
                                    $exactOr.push({compoundPairings: { $nin: anywherePairings }})
                                }
                                if(includeIntermediateParings.length > 0){
                                    $exactOr.push({intermediatePairings: { $nin: anywherePairings }})
                                }
                                $exactOr.push({ basicPairings: { $nin: anywherePairings }})
                                query.$and.push({$or: $exactOr})
                            }
                        } else {  // if filter includes onl basic tiles
                            if (tiles.length > 0) {
                                query.$and.push({ basicPairings: { $nin: anywherePairings }});
                            }
                        }
                        
                    }
                }
            }
            
            if(filter.nLetters && filter.nLetters.gte > 0 && filter.nLetters.lte > 0){
                query.$and.push({nLetters: this._comparisonFilterChange(filter.nLetters)});
            }

            if(filter.nSyllables && filter.nSyllables.gte > 0 && filter.nSyllables.lte > 0){
                query.$and.push({nSyllables: this._comparisonFilterChange(filter.nSyllables)});
            }

            if(filter.exactWords && filter.exactWords.length > 0) {
                // let exactWords = filter.exactWords.map((word:any) => {
                //     return {word: word.toLowerCase()};
                // });
                // query.$and.push({$or: exactWords});
                let exactWords = filter.exactWords.map((word:any) => {
                    return word.toLowerCase();
                });
                console.log('exact words', exactWords)
                query.$and.push({word: {$in: exactWords}});
            }

            if(filter.excludeWords && filter.excludeWords.length > 0) {
                let excludeWords = filter.excludeWords.map((word:any) => {
                    return {word: {$ne: word.toLowerCase()}};
                });
                query.$and.push({$and: excludeWords});
            }

            if(filter.wordContains && filter.wordContains.length > 0) {
                let wordContains = filter.wordContains.map((word:any) => {
                    // return JSON.parse(`/${word}/`) ;
                    return  `${word}`
                });
                wordContains = wordContains.join('|')
                console.log('regular expression',  wordContains)

                console.log('word contains', wordContains)
                query.$and.push({word: {$regex: wordContains}});
            }

            if(filter.wordDoesNotContain && filter.wordDoesNotContain.length > 0) {
                let wordDoesNotContain = filter.wordDoesNotContain.map((word:any) => {
                    return {word: {$regex: `^((?!${word}).)*$`}};
                });
                query.$and.push({$and: wordDoesNotContain});
            }

            if(filter.wordBeginsWith && filter.wordBeginsWith.length > 0) {
                let wordBeginsWith = filter.wordBeginsWith.map((word:any) => {
                    return `^${word}` ;
                });
                query.$and.push({word: {$regex: wordBeginsWith.join('|') }});
            }

            if(filter.wordEndsWith && filter.wordEndsWith.length > 0) {
                let wordEndsWith = filter.wordEndsWith.map((word: any) => {
                    return `${word}$` ;
                });
                query.$and.push({ word: { $regex: wordEndsWith.join('|') } });
            }

            if(filter.anyGrapheme && filter.anyGrapheme.length > 0) {
                // $exactOr.push({allGraphemes: {$in: filter.anyGrapheme}});
                query.$and.push({allGraphemes: {$in: filter.anyGrapheme}});
            }

            if(filter.firstGrapheme && filter.firstGrapheme.length > 0) {
                query.$and.push({firstGrapheme: {$in: filter.firstGrapheme}});
            }

            if(filter.lastGrapheme && filter.lastGrapheme.length > 0) {
                query.$and.push({lastGrapheme: {$in: filter.lastGrapheme}});
            }

            if(filter.doesNotContainGrapheme && filter.doesNotContainGrapheme.length > 0) {
                query.$and.push({allGraphemes: {$nin: filter.doesNotContainGrapheme}});
            }

            if (filter.exactTiles) {
                const tiles: any = [];
                let includeCompoundParings:any = [];
                let includeIntermediateParings:any = [];
                let $and = []
                filter.exactTiles.forEach((tile: any) =>
                {
                    if(tile.examples) {
                        tile.examples.forEach((example: any)=>{
                            if(example.value && example.checked){
                                tiles.push(example.value);
                            }
                            if(example.form === 'compound' && example.checked){
                                includeCompoundParings.push(example.value);
                            }
                            if(example.form === 'intermediate' && example.checked){
                                includeIntermediateParings.push(example.value);
                            }
                        })
                    } else {
                        tiles.concat(filter.exactTiles);
                    }

                });

                if (tiles && tiles.length > 0) {
                    let anywherePairings = this.pairingsArray.filter(pairing =>{
                        if(!tiles.includes(pairing.pairing)){
                            return true;
                        }
                    });
                    if(anywherePairings.length > 0){
                        anywherePairings = anywherePairings.map(pairing => pairing.pairing);
                        console.log('anywhere pairings', anywherePairings)
                        console.log('tiles', tiles)

                        // if filter includes compound or intermediate
                        if(includeCompoundParings.length > 0 || includeIntermediateParings.length > 0){
                            if(tiles.length > 0){
                                if(includeCompoundParings.length > 0){
                                    $exactOr.push({compoundPairings: { $nin: anywherePairings }})
                                }
                                if(includeIntermediateParings.length > 0){
                                    $exactOr.push({intermediatePairings: { $nin: anywherePairings }})
                                }
                                $exactOr.push({ basicPairings: { $nin: anywherePairings }})
                                query.$and.push({$or: $exactOr})
                            }
                        } else {  // if filter includes onl basic tiles
                            if (tiles.length > 0) {
                                query.$and.push({ basicPairings: { $nin: anywherePairings }});
                            }
                        }
                        
                    }
                }
            }

            if(filter.nSounds) {
                query.$and.push({nSounds: this._comparisonFilterChange(filter.nSounds)});
            }

            //Syllable Types
            // if(filter.firstSylType && filter.firstSylType.length > 0) {
            //     filter.firstSylType.unshift('-');
            //     query.$and.push({firstSylType: {$in: filter.firstSylType}});
            // }

            // if(filter.secondSylType && filter.secondSylType.length > 0) {
            //     filter.secondSylType.unshift('-');
            //     query.$and.push({secondSylType: {$in: filter.secondSylType}});
            // }

            // if(filter.thirdSylType && filter.thirdSylType.length > 0) {
            //     filter.thirdSylType.unshift('-');
            //     query.$and.push({thirdSylType: {$in: filter.thirdSylType}});
            // }

            // if(filter.fourthSylType && filter.fourthSylType.length > 0) {
            //     filter.fourthSylType.unshift('-');
            //     query.$and.push({fourthSylType: {$in: filter.fourthSylType}});
            // }

            // if(filter.fifthSylType && filter.fifthSylType.length > 0) {
            //     filter.fifthSylType.unshift('-');
            //     query.$and.push({fifthSylType: {$in: filter.fifthSylType}});
            // }

            // if(filter.sixthSylType && filter.sixthSylType.length > 0) {
            //     filter.sixthSylType.unshift('-');
            //     query.$and.push({sixthSylType: {$in: filter.sixthSylType}});
            // }
            // if(filter.sylNumber && filter.sylNumber.length > 0) {
            //     // "Must Contain" Subfilter
            //     // - Cross-reference against Syllable Type Keys for a unique number key
            //     // the syllable types are numbered in such away that we can use binary masks to search for
            //     // the proper words based on selections made
            //     let syllableKey = 0;
            //     filter.sylNumber.forEach((sylType:any) => syllableKey += syllableTypeKeys[sylType]);

            //     const allMatchingValues = [...Array(64).keys()].filter(num => (syllableKey & num) === syllableKey);

            //     if (syllableKey > 0) {
            //         query.$and.push({sylNumber: {$in: allMatchingValues}});
            //     }
            // }

            if(filter.syldivRules && filter.syldivRules.length > 0) {
                const excludedSylDivs = filter.syldivRules.filter((division:any) => filter.syldivRules.indexOf(division) < 0);
                query.$and.push({syldivRules: {$in: filter.syldivRules, $nin: excludedSylDivs}});
            }

            if(filter.quickExclude && filter.quickExclude.length > 0) {
                query.$and.push({excludeTags: {$nin: filter.quickExclude}});
            }

            if(filter.quickInclude && filter.quickInclude.length > 0) {
                query.$and.push({includeTags: {$in: filter.quickInclude}});
            }

            if (filter.sylTypes) {
                if(filter.sylTypes.firstSylType && filter.sylTypes.firstSylType.length > 0){
                    query.$and.push({"firstSylType": {$in : filter.sylTypes.firstSylType}});
                }
                if(filter.sylTypes.secondSylType && filter.sylTypes.secondSylType.length > 0){
                    query.$and.push({"secondSylType": {$in : filter.sylTypes.secondSylType}});
                }
                if(filter.sylTypes.thirdSylType && filter.sylTypes.thirdSylType.length > 0){
                    query.$and.push({"thirdSylType": {$in : filter.sylTypes.thirdSylType}});
                }
                if(filter.sylTypes.fourthSylType && filter.sylTypes.fourthSylType.length > 0){
                    query.$and.push({"fourthSylType": {$in : filter.sylTypes.fourthSylType}});
                }
                if(filter.sylTypes.fifthSylType && filter.sylTypes.fifthSylType.length > 0){
                    query.$and.push({"fifthSylType": {$in : filter.sylTypes.fifthSylType}});
                }
                if(filter.sylTypes.sixthSylType && filter.sylTypes.sixthSylType.length > 0){
                    query.$and.push({"sixthSylType": {$in : filter.sylTypes.sixthSylType}});
                }
                if(filter.sylTypes.wordMustContain && filter.sylTypes.wordMustContain.length > 0){
                    query.$and.push({"sylTypes": {$in : filter.sylTypes.wordMustContain}});
                }
            }
            if(filter.onsetLetters && filter.onsetLetters.length > 0) {
                query.$and.push({onsetLetters: {$in: filter.onsetLetters}});
            }

            if(filter.rimeLetters && filter.rimeLetters.length > 0) {
                query.$and.push({rimeLetters: {$in: filter.rimeLetters}});
            }

            if(filter.initialblendArray && filter.initialblendArray.length > 0) {
                query.$and.push({initialblendArray: {$in: filter.initialblendArray}});
            }

            if(filter.endingblendArray && filter.endingblendArray.length > 0) {
                query.$and.push({endingblendArray: {$in: filter.endingblendArray}});
            }

            if(filter.cvcPatterns && filter.cvcPatterns.length > 0) {
                let patterns: any[] = filter.cvcPatterns.map((pattern:any)=>{
                    return pattern.toUpperCase();
                })
                query.$and.push({CorV2: {$in: patterns}});
            }

            if(filter.suffixes && filter.suffixes.length > 0) {
                query.$and.push({suffixes: {$in: filter.suffixes}});
            }

            if(filter.prefixes && filter.prefixes.length > 0) {
                query.$and.push({prefixes: {$in: filter.prefixes}});
            }

            //Sound/Letter Pairings
            if (filter.soundPairing) {
                if (filter.soundPairing.firstPairing && filter.soundPairing.firstPairing.length > 0) {
                    let beginningPairings = this.pairingsArray
                        .filter(pairing => {
                        let examplePredicates = false;
                        if (filter.soundPairing.firstPairing.length > 0) {
                            filter.soundPairing.firstPairing.forEach((example:any) => {
                                examplePredicates = examplePredicates || pairing.pairing === example});
                        }
                        else {
                            examplePredicates = true;
                        }
                        return filter.soundPairing.firstPairing.indexOf(pairing.pairing) >= 0 && examplePredicates;
                    })
                        .map(pairing => pairing.pairing);
                    if (filter.soundPairing.firstPairing.length > 0) {
                        query.$and.push({ firstPairing: { $in: beginningPairings } });
                    }
                    else {
                        query.$and.push({ firstGrapheme: filter.soundPairing.firstPairing });
                    }
                }
                if (filter.soundPairing.lastPairing && filter.soundPairing.lastPairing.length > 0) {
                    let endingPairings = this.pairingsArray
                        .filter(pairing => {
                        let examplePredicates = false;
                        if (filter.soundPairing.lastPairing.length > 0) {
                            filter.soundPairing.lastPairing.forEach((example:any) => {
                                examplePredicates = examplePredicates || pairing.pairing === example});
                        }
                        else {
                            examplePredicates = true;
                        }
                        return filter.soundPairing.lastPairing.indexOf(pairing.pairing) >= 0 && examplePredicates;
                    })
                        .map(pairing => pairing.pairing);
                    if (filter.soundPairing.lastPairing.length > 0) {
                        query.$and.push({ lastPairing: { $in: endingPairings } });
                    }
                    else {
                        query.$and.push({ firstGrapheme: filter.soundPairing.lastPairing });
                    }
                }
                if (filter.soundPairing.basicPairing && filter.soundPairing.basicPairing.length > 0) {
                    let anywherePairings = this.pairingsArray
                        .filter(pairing => {
                        let examplePredicates = false;
                        if (filter.soundPairing.basicPairing.length > 0) {
                            filter.soundPairing.basicPairing.forEach((example:any) => {
                                examplePredicates = examplePredicates || pairing.pairing === example});
                        }
                        else {
                            examplePredicates = true;
                        }
                        return filter.soundPairing.basicPairing.indexOf(pairing.pairing) >= 0 && examplePredicates;
                    });

                    if(anywherePairings.length > 0){
                        const form = anywherePairings[0].form;
                        anywherePairings = anywherePairings.map(pairing => pairing.pairing);
                        const anywherePairingsBeginningSounds = uniq(anywherePairings.map(pairing => pairing.substring(0, pairing.indexOf("-") + 1)));
                        let excludedAnywherePairings = this.pairingsArray
                            .filter(pairing => {
                                let isBeggingWith = anywherePairingsBeginningSounds.filter((pairingBeggingSound: any) => {
                                    return pairing.pairing.indexOf(pairingBeggingSound) === 0
                                }).length > 0;
                                // let isAnywherePairing = anywherePairings.findIndex(anywherePairing => anywherePairing === pairing.pairing);
                                return isBeggingWith;
                            })
                            .map(pairing => pairing.pairing);
                        excludedAnywherePairings = difference(excludedAnywherePairings, anywherePairings);
                        if (filter.soundPairing.basicPairing.length > 0) {
                            if (form === 'basic') {
                                query.$and.push({ basicPairings: { $in: anywherePairings, $nin:excludedAnywherePairings } });
                            }
                            else if (form === 'intermediate') {
                                query.$and.push({ intermediatePairings: { $in: anywherePairings, $nin:excludedAnywherePairings } });
                            }
                            else if (form === 'compound') {
                                query.$and.push({ compoundPairings: { $in: anywherePairings, $nin:excludedAnywherePairings } });
                            }else {
                                if (graphemes[filter.soundPairing.basicPairing].advancedType === 'basic') {
                                    query.$and.push({ basicGrs: filter.soundPairing.basicPairing.grapheme });
                                }
                                else if (graphemes[filter.soundPairing.basicPairing].advancedType === 'intermediate') {
                                    query.$and.push({ intermediateGrs: filter.soundPairing.basicPairing.grapheme });
                                }
                                else if (graphemes[filter.soundPairing.basicPairing].advancedType === 'compound') {
                                    query.$and.push({ compoundGrs: filter.soundPairing.basicPairing.grapheme });
                                }
                            }
                        }
                    }
                }
            }

            // filter out staff only words
            if(!filter.planType || filter.planType.toLowerCase() !== 'staff') {
                query.planType = {$nin: ["staff"]};
            }

            if(query.$and.length === 0) {
                delete query.$and;
            }
            if($exactOr.length === 1){
                query.$and.push({$or: $exactOr})
            }
            console.log('query', query['$and'])
            words
                .findAsCursor(query)
                .limit(400)
                .sort({frequency: -1})
                .toArray()
                .then((result:any) => {
                    resolve(result)
                })
                .catch((error:any) => {
                    console.log('error', error)
                    reject(error)
                })
            });
    }

    // this is necessary because you cannot save $gte etc in mongo because of the dollar sign
    // since this is the case, for consistency the filters are saved without the dollarsign and word requests
    // are made without the dollar sign. This function will restore the dollar sign for the search
    private _comparisonFilterChange(filterObj:any) {
        let obj = {...{}, ...filterObj};
        if(obj.gte) {
            obj.$gte = obj.gte;
            delete obj.gte;
        }

        if(obj.lte) {
            obj.$lte = obj.lte;
            delete obj.lte;
        }

        return obj;
    }
    private pairingsArray: any[] = Object.keys(Pairings).map(pairing => {
        let arrayObj = Pairings[pairing];
        arrayObj.pairing = pairing;
        return arrayObj;
    });

}

export {WordMongoDao};
