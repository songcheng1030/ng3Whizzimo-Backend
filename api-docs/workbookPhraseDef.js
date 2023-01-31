const workbookPhrase = {
  post: {
    post: {
      operationId: "postWorkbookPhrase",
      summary: "Creates New workbook phrase association",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookPhrase",
          "in": "body",
          "description": "Workbook Sentence Object",
          "schema": {
            "type": "object",
            "required": [
              "workbookId",
              "phraseId"
            ],
            "properties": {
              "workbookId": {
                "example": "5e9fbd226094d15f64b30fe",
                "type": "string"
              },
              "phraseId": {
                "example": "5e9fbd1263cf364a70265028",
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
    }
  },
  workbookId: {
    get: {
      operationId: "getWorkbookPhrases",
      summary: "Gets all workbook phrases",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of workbook that the phrase is a part of.",
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
  workbookPhraseId: {
    get: {
      operationId: "getworkbookPhrase",
      summary: "Gets a single workbook phrase",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookPhraseId",
          "in": "path",
          "description": "Id of the workbook phrase",
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
      operationId: "updateWorkbookPhrase",
      summary: "Updates a single workbook phrase",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookPhraseId",
          "in": "path",
          "description": "Id of the workbook phrase",
          "type": "string",
          "required": true,
        },
        {
          "name": "data",
          "in": "body",
          "description": "updated fields",
          "required": true,
          "properties": {}
        }
      ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    },
    delete: {
      operationId: "deleteWorkbookPhrase",
      summary: "Deletes a single workbook phrase",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookPhraseId",
          "in": "path",
          "description": "Id of the workbook phrase",
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

module.exports = workbookPhrase;
