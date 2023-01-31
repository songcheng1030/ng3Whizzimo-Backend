run();

async function run() {
    const {db} = await require('../db');
    let wordlist = db.collection('wordlist');
    let newWorkbooks;
    try {
        newWorkbooks = db.collection('workbook');
        await newWorkbooks.deleteMany({})
        convertMongo()
    } catch (error) {
        newWorkbooks = db.createCollection('workbook');
        convertMongo()
    }

    async function convertMongo() {
        const wordlists = await wordlist.find().toArray();
        let workbooks = wordlists.map(wordlist => {
            if (wordlist._id === "NpeoNMm7mt") {
                const test = "";
            }
            let filters = {};

            if(wordlist.filters) {
                let phonetic = wordlist.filters.find(filter => filter.name === 'Phonetic/Non-Phonetic');
                if (phonetic) {
                    filters.isPhonetic = phonetic.val === 'phonetic';
                }

                let numberOfLetters = wordlist.filters.find(filter => filter.name === 'Number of Letters');
                if (numberOfLetters) {
                    filters.nLetters = {gte: numberOfLetters.val.min, lte: numberOfLetters.val.max};
                }

                let numberOfSyllables = wordlist.filters.find(filter => filter.name === 'Number of Syllables');
                if (numberOfSyllables) {
                    filters.nSyllables = {gte: numberOfSyllables.val.min, lte: numberOfSyllables.val.max};
                }

                let nonsense = wordlist.filters.find(filter => filter.name === 'Nonsense/Real');
                if (nonsense) {
                    filters.isNonsense = typeof nonsense.val === 'object'
                        ? Object.keys(nonsense.val).filter(key => nonsense.val[key])
                        : [nonsense.val];
                }

                let exactTiles = wordlist.filters.find(filter => filter.name === 'Exact Tiles');
                if (exactTiles && exactTiles.val) {
                    filters.exactTiles = exactTiles.val.tiles;
                }

                let wordContains = wordlist.filters.find(filter => filter.name === 'Word Contains');
                if (wordContains && wordContains.val) {
                    filters.wordContains = wordContains.val.split(",").map(word => word.trim());
                }

                let wordDoesNotContain = wordlist.filters.find(filter => filter.name === 'Word Does Not Contain');
                if (wordDoesNotContain && wordDoesNotContain.val) {
                    filters.wordDoesNotContain = wordDoesNotContain.val.split(",").map(word => word.trim());
                }

                let wordBeginsWith = wordlist.filters.find(filter => filter.name === 'Word Begins With');
                if (wordBeginsWith && wordBeginsWith.val) {
                    filters.wordBeginsWith = wordBeginsWith.val.split(",").map(word => word.trim());
                }

                let wordEndsWith = wordlist.filters.find(filter => filter.name === 'Word Ends With');
                if (wordEndsWith && wordEndsWith.val) {
                    filters.wordEndsWith = wordEndsWith.val.split(",").map(word => word.trim());
                }

                let anyGrapheme = wordlist.filters.find(filter => filter.name === 'Any Grapheme');
                if (anyGrapheme && anyGrapheme.val) {
                    filters.anyGrapheme = anyGrapheme.val.split(",").map(word => word.trim());
                }

                let doesNotContainGrapheme = wordlist.filters.find(filter => filter.name === 'Does Not Contain Grapheme');
                if (doesNotContainGrapheme && doesNotContainGrapheme.val) {
                    filters.doesNotContainGrapheme = doesNotContainGrapheme.val.split(",").map(word => word.trim());
                }

                let firstGrapheme = wordlist.filters.find(filter => filter.name === 'First Grapheme');
                if (firstGrapheme && firstGrapheme.val) {
                    filters.firstGrapheme = firstGrapheme.val.split(",").map(word => word.trim());
                }

                let lastGrapheme = wordlist.filters.find(filter => filter.name === 'Last Grapheme');
                if (lastGrapheme && lastGrapheme.val) {
                    filters.lastGrapheme = lastGrapheme.val.split(",").map(word => word.trim());
                }

                let numberOfSounds = wordlist.filters.find(filter => filter.name === 'Number of Sounds');
                if (numberOfSounds && numberOfSounds.val) {
                    filters.nSounds = {gte: numberOfSounds.val.min, lte: numberOfSounds.val.max};
                }

                let syllableTypes = wordlist.filters.find(filter => filter.name === 'Syllable Type');
                if (syllableTypes && syllableTypes.val) {
                    filters.sylTypes = {};
                    let sylIndexes = Object.keys(syllableTypes.val).sort();
                    sylIndexes.forEach(sylIndex => {
                        if(sylIndex === "s0") filters.sylTypes.wordMustContain = Object.keys(syllableTypes.val[sylIndex].type);
                        if(sylIndex === "s1") filters.sylTypes.firstSylType = Object.keys(syllableTypes.val[sylIndex].type);
                        if(sylIndex === "s2") filters.sylTypes.secondSylType = Object.keys(syllableTypes.val[sylIndex].type);
                        if(sylIndex === "s3") filters.sylTypes.thirdSylType = Object.keys(syllableTypes.val[sylIndex].type);
                        if(sylIndex === "s4") filters.sylTypes.fourthSylType = Object.keys(syllableTypes.val[sylIndex].type);
                        if(sylIndex === "s5") filters.sylTypes.fifthSylType = Object.keys(syllableTypes.val[sylIndex].type);
                        if(sylIndex === "s6") filters.sylTypes.sixthSylType = Object.keys(syllableTypes.val[sylIndex].type);
                    });
                }

                let syllableDivision = wordlist.filters.find(filter => filter.name === 'Syllable Division');
                if (syllableDivision && syllableDivision.val) {
                    filters.syldivRules = Object.keys(syllableDivision.val).filter(key => syllableDivision.val[key]);
                }

                let quickExclude = wordlist.filters.find(filter => filter.name === 'Quick Exclude');
                if (quickExclude && quickExclude.val) {
                    filters.quickExclude = Object.keys(quickExclude.val.exclude);
                }

                let quickInclude = wordlist.filters.find(filter => filter.name === 'Quick Include');
                if (quickInclude && quickInclude.val) {
                    filters.quickInclude = Object.keys(quickInclude.val.include);
                }

                let exactWords = wordlist.filters.find(filter => filter.name === 'Exact Words');
                if (exactWords && exactWords.val) {
                    if(!exactWords.val) {
                        let test ='';
                    }
                    filters.exactWords = exactWords.val.split(",").map(word => word.trim());
                }

                let excludeWords = wordlist.filters.find(filter => filter.name === 'Exclude Words');
                if (excludeWords && excludeWords.val) {
                    filters.excludeWords = excludeWords.val.split(",").map(word => word.trim());
                }

                let onsetLetters = wordlist.filters.find(filter => filter.name === 'Onset Letters');
                if (onsetLetters && onsetLetters.val) {
                    filters.onsetLetters = onsetLetters.val.split(",").map(word => word.trim());
                }

                let rimeLetters = wordlist.filters.find(filter => filter.name === 'Rime Letters');
                if (rimeLetters && rimeLetters.val) {
                    filters.rimeLetters = rimeLetters.val.split(",").map(word => word.trim());
                }

                let initialblendArray = wordlist.filters.find(filter => filter.name === 'Initial Blends');
                if (initialblendArray) {
                    filters.initialblendArray = initialblendArray.val.split(",").map(word => word.trim());
                }

                let endingblendArray = wordlist.filters.find(filter => filter.name === 'Ending Blends');
                if (endingblendArray && endingblendArray.val) {
                    filters.endingblendArray = endingblendArray.val.split(",").map(word => word.trim());
                }

                let cvcPatterns = wordlist.filters.find(filter => filter.name === 'CVC Patterns');
                if (cvcPatterns && cvcPatterns.val) {
                    filters.cvcPatterns = cvcPatterns.val.split(",").map(word => word.trim());
                }

                let suffixes = wordlist.filters.find(filter => filter.name === 'Suffixes');
                if (suffixes && suffixes.val) {
                    filters.suffixes = suffixes.val.split(",").map(word => word.trim());
                }

                let prefixes = wordlist.filters.find(filter => filter.name === 'Prefixes');
                if (prefixes && prefixes.val) {
                    filters.prefixes = prefixes.val.split(",").map(word => word.trim());
                }

                let soundLetterPairing = wordlist.filters.find(filter => filter.name === 'Sound/Letter Pairings');
                if (soundLetterPairing && soundLetterPairing.val) {
                    filters.soundPairing = {
                        firstPairing:soundLetterPairing.val.beginning.phonemes
                            ? Object.keys(soundLetterPairing.val.beginning.phonemes)
                                .filter(key => soundLetterPairing.val.beginning.phonemes[key] === true)
                                .map(example => `${soundLetterPairing.val.beginning.grapheme}-${example}`)
                            : [],
                        lastPairing: soundLetterPairing.val.ending.phonemes
                            ? Object.keys(soundLetterPairing.val.ending.phonemes)
                                .filter(key => soundLetterPairing.val.ending.phonemes[key] === true)
                                .map(example => `${soundLetterPairing.val.ending.grapheme}-${example}`)
                            :[],
                        basicPairing: soundLetterPairing.val.anywhere.phonemes
                            ? Object.keys(soundLetterPairing.val.anywhere.phonemes)
                                .filter(key => soundLetterPairing.val.anywhere.phonemes[key] === true)
                                .map(example => `${soundLetterPairing.val.anywhere.grapheme}-${example}`)
                            : []
                    }
                }
            }

            wordlist.filters = filters;
            wordlist.oldId = wordlist._id;
            // delete wordlist._id;
            return wordlist;
        });

        for (let i = 0; i < workbooks.length; i += 50000) {
            await newWorkbooks.insertMany(workbooks.slice(i, i+50000));
        }


        console.log('workbook collection created successfully!');
        process.exit(0);
    }

}
