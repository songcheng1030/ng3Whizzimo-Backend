const workbook = {
  post: {
    post: {
      operationId: "postWorkbook",
      summary: "Creates New Workbook",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbook",
          "in": "body",
          "description": "Workbook Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "filters",
              "name",
              "tiles",
              "ownerKey"
            ],
            "properties": {
              "name": {
                "type": "string"
              },
              "ownerKey": {
                "type": "string"
              },
              "tiles": {
                "example": [
                  "tiles.bv.a",
                  "tiles.bv.e",
                  "tiles.bv.i",
                  "tiles.bv.o",
                  "tiles.bv.u",
                  "tiles.bv.y",
                  "tiles.bc.b",
                  "tiles.bc.c",
                  "tiles.bc.f"
                ],
                "type": "array"
              },
              "filters": {
                "type": "array",
                "example": {
                  isPhonetic: true,
                  isNonsense: false,
                  nLetters: {gte: 1, lte: 5},
                  nSyllables: {gte: 1, lte: 5},
                }
              },
              "desc": {
                "type": "string"
              },
            }
          }
        },
      ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    }
  },
  ids: {
    get: {
      operationId: "getWorkbooksByIds",
      summary: "Gets workbooks by list of ids",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "ids",
          "in": "path",
          "description": "list of ids in a string format",
          "type": "string",
          "example": "32094dsdf,324243,342234,324324,",
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
  userId: {
    get: {
      operationId: "getWorkbooks",
      summary: "Gets all user workbooks",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user that owns the workbook",
          "type": "string",
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
  workbookId: {
    get: {
      operationId: "getWorkbook",
      summary: "Gets a single workbook",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of the workbook",
          "type": "string",
          "required": true,
        }
      ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    },
    put: {
      operationId: "putWorkbook",
      summary: "Updates a single workbook",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of the workbook",
          "type": "string",
          "required": true,
        },
        {
          "name": "workbook",
          "in": "body",
          "description": "Workbook Object",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "tiles": {
                "example": [
                  "tiles.bv.a",
                  "tiles.bv.e",
                  "tiles.bv.i",
                  "tiles.bv.o",
                  "tiles.bv.u",
                  "tiles.bv.y",
                  "tiles.bc.b",
                  "tiles.bc.c",
                  "tiles.bc.f"
                ],
                "type": "array"
              },
              "filters": {
                "type": "array",
                "example": {
                  isPhonetic: true,
                  isNonsense: false,
                  nLetters: {gte: 1, lte: 5},
                  nSyllables: {gte: 1, lte: 5},
                }
              },
              "desc": {
                "type": "string"
              },
            }
          }
        }
      ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    },
    delete: {
      operationId: "deleteWorkbook",
      summary: "Deletes a single workbook, as well as all associated items",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of the workbook",
          "type": "string",
          "required": true,
        }
      ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    }
  }
};

module.exports = workbook;
