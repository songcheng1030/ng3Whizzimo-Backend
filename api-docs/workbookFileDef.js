const workbookFile = {
  post: {
    post: {
      operationId: "postWorkbookFile",
      summary: "Creates New workbook file association",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookFile",
          "in": "body",
          "description": "Workbook File Object",
          "schema": {
            "type": "object",
            "required": [
              "workbookKey",
              "fileId"
            ],
            "properties": {
              "workbookId": {
                "example": "5e9fbd226094d15f64b30fe0",
                "type": "string"
              },
              "fileId": {
                "example": "5DXfQm8v3l",
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
  multi: {
    post: {
      operationId: "postWorkbookFiles",
      summary: "Creates New Workbook Files",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookFiles",
          "in": "body",
          "description": "WorkbookFiles array",
          "required": true,
          "schema": {
            "type": "array",
            "items": {
              "properties": {
                "workbookId": {
                  "example": "5e9fbd226094d15f64b30fe0",
                  "type": "string"
                },
                "fileId": {
                  "example": "5DXfQm8v3l",
                  "type": "string"
                },
              }
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
      operationId: "getWorkbookFiles",
      summary: "Gets all workbook files",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of workbook that the file is a part of.",
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
  workbookFileId: {
    get: {
      operationId: "getWorkbookFile",
      summary: "Gets a single workbook file",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookFileId",
          "in": "path",
          "description": "Id of the workbook file",
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
    delete: {
      operationId: "deleteWorkbookFile",
      summary: "Deletes a single workbook file",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookFileId",
          "in": "path",
          "description": "Id of the workbook file",
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
      operationId: "putWorkbookFile",
      summary: "Updates a single workbook file",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookFileId",
          "in": "path",
          "description": "Id of the workbook file",
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
    }
  }
};

module.exports = workbookFile;
