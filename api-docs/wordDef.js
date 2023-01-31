const words = {
    post: {
        post: {
            operationId: "postWordsQuery",
            summary: "searches for words by query",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "query",
                    "in": "body",
                    "description": "Query Object",
                    "schema": {
                        "type": "object",
                        "required": [
                            "isPhonetic",
                            "isNonsense",
                            "nLetters",
                            "nSyllables",
                        ],
                        "properties": {
                            "isPhonetic": {
                                "type": "boolean"
                            },
                            "isNonsense": {
                                "type": "boolean"
                            },
                            "nLetters": {
                                "example": {
                                    gte: 1,
                                    lte: 5
                                },
                                "type": "object"
                            },
                            "nSyllables": {
                                "example": {
                                    gte: 1,
                                    lte: 5
                                },
                                "type": "object"
                            },
                            "exactWords": {
                                "type": "array",
                                "example": ["test"]
                            },
                            "excludeWords": {
                                "type": "array",
                                "example": ["special"]
                            },
                            "wordContains": {
                                "type": "array",
                                "example": ["st"]
                            },
                            "wordDoesNotContains": {
                                "type": "array",
                                "example": ["l"]
                            },
                            "wordBeginsWith": {
                                "type": "array",
                                "example": ["te"]
                            },
                            "wordEndsWith": {
                                "type": "array",
                                "example": ["te"]
                            },
                            "anyGrapheme": {
                                "type": "array",
                                "example": ["ll"]
                            },
                            "firstGrapheme": {
                                "type": "array",
                                "example": ["t"]
                            },
                            "lastGrapheme": {
                                "type": "array",
                                "example": ["t"]
                            },
                            "doesNotContainGrapheme": {
                                "type": "array",
                                "example": ["ss"]
                            },
                            "nSounds": {
                                "example": {
                                    gte: 1,
                                    lte: 5
                                },
                                "type": "object"
                            },
                            "firstSylType": {
                                "type": "array",
                                "example": [
                                    "R-Controlled",
                                    "Vowel Team",
                                    "Magic E",
                                    "Consonant-le",
                                    "Open",
                                    "Closed",
                                ]
                            },
                            "secondSylType": {
                                "type": "array",
                                "example": [
                                    "R-Controlled",
                                    "Vowel Team",
                                    "Magic E",
                                    "Consonant-le",
                                    "Open",
                                    "Closed",
                                ]
                            },
                            "thirdSylType": {
                                "type": "array",
                                "example": [
                                    "R-Controlled",
                                    "Vowel Team",
                                    "Magic E",
                                    "Consonant-le",
                                    "Open",
                                    "Closed",
                                ]
                            },
                            "fourthSylType": {
                                "type": "array",
                                "example": [
                                    "R-Controlled",
                                    "Vowel Team",
                                    "Magic E",
                                    "Consonant-le",
                                    "Open",
                                    "Closed",
                                ]
                            },
                            "fifthSylType": {
                                "type": "array",
                                "example": [
                                    "R-Controlled",
                                    "Vowel Team",
                                    "Magic E",
                                    "Consonant-le",
                                    "Open",
                                    "Closed",
                                ]
                            },
                            "sixthSylType": {
                                "type": "array",
                                "example": [
                                    "R-Controlled",
                                    "Vowel Team",
                                    "Magic E",
                                    "Consonant-le",
                                    "Open",
                                    "Closed",
                                ]
                            },
                            "sylNumber": {
                                "type": "array",
                                "example": [
                                    "R-Controlled",
                                    "Vowel Team",
                                    "Magic E",
                                    "Consonant-le",
                                    "Open",
                                    "Closed",
                                ]
                            },
                            "syllableDivision": {
                                "type": "array",
                                "example": ["CW"]
                            },
                            "soundLetterPairings": {
                                "example": {
                                    Beginning: {
                                        grapheme: 'a',
                                        examples: ["c(a)t"]
                                    },
                                    Ending: {
                                        grapheme: 'a'
                                    },
                                    anywhere: {
                                        grapheme: 'a', examples: ['c(a)t']
                                    },
                                },
                                "type": "object"
                            },
                            "quickExclude": {
                                "type": "array",
                                "example": ["2-1-1"]
                            },
                            "quickInclude": {
                                "type": "array",
                                "example": ["2-1-1"]
                            },
                            "onsetLetters": {
                                "type": "array",
                                "example": ["bl"]
                            },
                            "rimeLetters": {
                                "type": "array",
                                "example": ["ct"]
                            },
                            "initialblendArray": {
                                "type": "array",
                                "example": ["bl"]
                            },
                            "endingblendArray": {
                                "type": "array",
                                "example": ["ct"]
                            },
                            "cvcPatterns": {
                                "type": "array",
                                "example": ["cvc"]
                            },
                            "suffixes": {
                                "type": "array",
                                "example": ["ing"]
                            },
                            "prefixes": {
                                "type": "array",
                                "example": ["pre"]
                            },
                        }
                    }
                },
                {"name": "customerId", "in": "path", "required": true}
            ],
            "responses": {
                "200": {
                    "description": "200 300 response"
                }
            }
        }
    },
    wordIds: {
        post: {
            operationId: "getWordsByWordId",
            summary: "searches for words by wordId",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "query",
                    "in": "body",
                    "description": "Query Object",
                    "type": "array",
                    "example": [
                        100,
                        101
                    ]
                }
            ],
            "responses": {
                "200": {
                    "description": "200 300 response"
                }
            }
        }
    },
    tiles: {
        post: {
            operationId: "getTilesByWordId",
            summary: "searches for tiles by wordId",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    name: "userId",
                    in: "path",
                    description: "id of user",
                    type: "string",
                    required: true
                },
                {
                    "name": "query",
                    "in": "body",
                    "description": "Query Object",
                    "type": "array",
                    "example": [
                        100,
                        101
                    ]
                }
            ],
            "responses": {
                "200": {
                    "description": "200 300 response"
                }
            }
        }
    },
    soundLetterPairings: {
        get: {
            operationId: "getSoundLetterPairings",
            summary: "gets Sound letter pairings",
            produces: [
                "application/json"
            ],
            "responses": {
                "200": {
                    "description": "200 300 response"
                }
            }
        }
    }
};
module.exports = words;
