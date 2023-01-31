const workbookSentence = {
  post: {
    post: {
      operationId: "postWorkbookSentence",
      summary: "Creates New workbook sentence association",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookSentence",
          "in": "body",
          "description": "Workbook Sentence Object",
          "schema": {
            "type": "object",
            "required": [
              "workbookId",
              "sentenceId"
            ],
            "properties": {
              "workbookId": {
                "example": "5e9fbd226094d15f64b30fe",
                "type": "string"
              },
              "sentenceId": {
                "example": "5e9fbd11f70c1247608fb61d",
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
  workbookId: {
    get: {
      operationId: "getWorkbookSentences",
      summary: "Gets all workbook sentences",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of workbook that the sentence is a part of.",
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
  workbookSentenceId: {
    get: {
      operationId: "getWorkbookSentence",
      summary: "Gets a single workbook sentence",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookSentenceId",
          "in": "path",
          "description": "Id of the workbook sentence",
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
      operationId: "updateWorkbookSentence",
      summary: "Updates a single workbook sentence",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookSentenceId",
          "in": "path",
          "description": "Id of the workbook sentence",
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
      operationId: "deleteWorkbookSentence",
      summary: "Deletes a single workbook sentence",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookSentenceId",
          "in": "path",
          "description": "Id of the workbook sentence",
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

module.exports = workbookSentence;
