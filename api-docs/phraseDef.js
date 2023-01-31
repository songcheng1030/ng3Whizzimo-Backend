const phrase = {
  post: {
    post: {
      operationId: "postphrase",
      summary: "Creates New phrase",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "phrase",
          "in": "body",
          "description": "{Phrase Object",
          "schema": {
            "type": "object",
            "required": [
              "phrase",
              "ownerKey"
            ],
            "properties": {
              "phrase": {
                "type": "string"
              },
              "ownerKey": {
                "type": "string"
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
  userId: {
    get: {
      operationId: "getphrases",
      summary: "Gets all user phrases",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user that owns the phrase",
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
  phraseId: {
    get: {
      operationId: "getphrase",
      summary: "Gets a single phrase",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "phraseId",
          "in": "path",
          "description": "Id of the phrase",
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
      operationId: "putphrase",
      summary: "Updates a single phrase",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "phraseId",
          "in": "path",
          "description": "Id of the phrase",
          "type": "string",
          "required": true,
        },
        {
          "name": "phrase",
          "in": "body",
          "description": "{Phrase Object",
          "schema": {
            "type": "object",
            "required": [
              "phrase"
            ],
            "properties": {
              "phrase": {
                "type": "string"
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
    },
    delete: {
      operationId: "deletephrase",
      summary: "Deletes a single phrase",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "phraseId",
          "in": "path",
          "description": "Id of the phrase",
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

module.exports = phrase;
