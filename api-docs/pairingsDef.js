const pairings = {
    get: {
        get: {
            operationId: "getPairings",
            summary: "Gets all pairings",
            produces: [
                "application/json"
            ],
            "responses": {
                "200": {
                    "description": "200 300 response"
                }
            }
        }
    },
    compoundSounds: {
        post: {
            operationId: "getCompoundSoundPairings",
            summary: "Gets all pairings for a specific compound sound",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "compoundSounds",
                    "in": "body",
                    "description": "pairings Object",
                    "schema": {
                        "type": "array",
                        example: [
                            "an-AAENN",
                            "ang-AAENGGG",
                            "ank-AAENGKK",
                            "arr-ARR",
                            "arr-AYERR",
                        ]
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "200 300 response"
                }
            }
        }
    },
};

module.exports = pairings;
