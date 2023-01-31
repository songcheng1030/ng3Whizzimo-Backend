const workbookPassage = {
  post: {
    post: {
      operationId: "postWorkbookPassage",
      summary: "Creates New workbook passage association",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookPassage",
          "in": "body",
          "description": "Workbook Passage Object",
          "schema": {
            "type": "object",
            "required": [
              "workbookKey",
              "passageId"
            ],
            "properties": {
              "workbookId": {
                "type": "string",
                "example": "5e9fbd226094d15f64b30fe0"
              },
              "passageId": {
                "type": "string",
                "example": "5e9fbd13dd5b6a83dcbd4d28"
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
      operationId: "getWorkbookPassages",
      summary: "Gets all workbook passages",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of workbook that the passage is a part of.",
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
  workbookPassageId: {
    get: {
      operationId: "getWorkbookPassage",
      summary: "Gets a single workbook passage",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookPassageId",
          "in": "path",
          "description": "Id of the workbook passage",
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
      operationId: "updateWorkbookPassage",
      summary: "Updates a single workbook Passage",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookPassageId",
          "in": "path",
          "description": "Id of the workbook passage",
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
      operationId: "deleteWorkbookPassage",
      summary: "Deletes a single workbook passage",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookPassageId",
          "in": "path",
          "description": "Id of the workbook passage",
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

module.exports = workbookPassage;
