const tiles = {
    get: {
        get: {
            operationId: "getTile",
            summary: "Gets all Tiles",
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
    query: {
        get: {
            operationId: "getTilesFromQuery",
            summary: "Gets tiles in query",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "query",
                    "in": "path",
                    "description": "string of possible tile value",
                    "type": "string",
                    example: "as",
                    "required": true,
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

module.exports = tiles;
