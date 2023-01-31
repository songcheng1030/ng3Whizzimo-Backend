const subscription = {
    multipleCreate: {
        post: {
          operationId: "multipleCreateSubcription",
          summary: "Create Multiple Subcription",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              "name": "subscriptions",
              "in": "body",
              "description": "Subscriptions Array",
              "required": true,
              "schema": {
                "type": "array",
                "items": {
                  "properties": {
                      "courseId": {
                        "type": "string"
                      },
                      "userId": {
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
}

module.exports = subscription;