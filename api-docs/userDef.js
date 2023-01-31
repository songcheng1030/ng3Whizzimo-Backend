const user = {
  email: {
    get: {
      operationId: "getUserByEmail",
      summary: "Gets a single user by email address",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "email",
          "in": "path",
          "description": "email address of user",
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
  },
  userId: {
    delete: {
      operationId: "removeUser",
      summary: "Removes a single user",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user",
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
    get: {
      operationId: "getUser",
      summary: "Gets a single user",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user",
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
      operationId: "putUser",
      summary: "Updates a user",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user",
          "type": "string",
          "required": true,
        },
        {
          "name": "user",
          "in": "body",
          "description": "user Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [],
            "properties": {
              "email" : {
                "type": "string"
              },
              "firstname": {
                "type": "string"
              },
              "lastname" : {
                "type": "string"
              },
              "plan" : {
                "type": "string"
              },
              "planType" : {
                "type": "string"
              },
              "promo" : {
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
  }
};

module.exports = user;
