const registration = {
  post: {
  post: {
    operationId: "postRegistration",
    summary: "Creates New User",
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
            "firstName",
            "lastName",
            "email",
            "password",
            "plan",
            "role",
            "username"
          ],
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "plan": {
              "type": "string"
            },
            "promo": {
              "type": "string"
            },
            "role": {
              "type": "string"
            },
            "code": {
              "type": "string"
            },
            "codeDesc": {
              "type": "string"
            },
            "username": {
              "type": "string"
            }
          }
        }
      }
    ],
    "responses": {
      "200": {
        "description": "200 300 response",
        "examples": {
          "application/json": {
            data: {
              authId: "",
              whizzimoId: "",
              stripeId: ""
            }
          }
        }
      }
    }
  }
  },
  createFirstCourse: {
    post: {
      operationId: "postFirstCourse",
      summary: "Creates a First Course for a user",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseInfo",
          "in": "body",
          "description": "Course Info",
          "schema": {
            "type": "object",
            "required": [
              "firstName",
              "lastName",
              "whizzimoId",
            ],
            "properties": {
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "whizzimoId": {
                "type": "string"
              }
            }
          }
        }
      ],
      "responses": {
        "200": {
          "description": "200 300 response",
          "examples": {
            "application/json": {
              data:{
                authId: "",
                whizzimoId: "",
                stripeId: ""
              }
            }
          }
        }
      }
    }
  }
};

module.exports = registration;
