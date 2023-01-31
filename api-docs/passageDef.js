const passage = {
  post: {
    post: {
      operationId: "postpassage",
      summary: "Creates New passage",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "passage",
          "in": "body",
          "description": "Passage Object",
          "schema": {
            "type": "object",
            "required": [
              "passage",
              "ownerKey"
            ],
            "properties": {
              "passage": {
                "type": "string"
              },
              "ownerKey": {
                "type": "string"
              }
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
  userId: {
    get: {
      operationId: "getpassages",
      summary: "Gets all user passages",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user that owns the passage",
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
  passageId: {
    get: {
      operationId: "getpassage",
      summary: "Gets a single passage",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "passageId",
          "in": "path",
          "description": "Id of the passage",
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
      operationId: "putpassage",
      summary: "Updates a single passage",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "passageId",
          "in": "path",
          "description": "Id of the passage",
          "type": "string",
          "required": true,
        },
        {
          "name": "passage",
          "in": "body",
          "description": "Passage Object",
          "schema": {
            "type": "object",
            "required": [
              "passage"
            ],
            "properties": {
              "passage": {
                "type": "string"
              }
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
      operationId: "deletepassage",
      summary: "Deletes a single passage",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "passageId",
          "in": "path",
          "description": "Id of the passage",
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

module.exports = passage;
