const sentence = {
  post: {
    post: {
      operationId: "postSentence",
      summary: "Creates New Sentence",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "sentence",
          "in": "body",
          "description": "Sentence Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "sentence",
              "ownerKey"
            ],
            "properties": {
              "sentence": {
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
      operationId: "getSentences",
      summary: "Gets all user sentences",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user that owns the sentence",
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
  sentenceId: {
    get: {
      operationId: "getSentence",
      summary: "Gets a single sentence",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "sentenceId",
          "in": "path",
          "description": "Id of the sentence",
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
      operationId: "putSentence",
      summary: "Updates a single sentence",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "sentenceId",
          "in": "path",
          "description": "Id of the sentence",
          "type": "string",
          "required": true,
        },
        {
          "name": "sentence",
          "in": "body",
          "description": "Sentence Text",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "sentence"
            ],
            "properties": {
              "sentence": {
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
      operationId: "deleteSentence",
      summary: "Deletes a single sentence",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "sentenceId",
          "in": "path",
          "description": "Id of the sentence",
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

module.exports = sentence;
