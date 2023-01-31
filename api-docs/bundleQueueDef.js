const bundleQueue = {
  post: {
    post: {
      operationId: "postBundleQueue",
      summary: "Creates New Bundle Queue",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "bundleQueue",
          "in": "body",
          "description": "BundleQueue Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "ownerKey",
              "bundleId",
            ],
            "properties": {
              "ownerKey": {
                "type": "string"
              },
              "bundleId": {
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
  send: {
    post: {
      operationId: "sendBundleQueue",
      summary: "Sends A New Bundle Queue to a User",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "bundleQueue",
          "in": "body",
          "description": "BundleQueue Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "userInfo",
              "bundleId",
            ],
            "properties": {
              "userInfo": {
                "type": "string"
              },
              "bundleId": {
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
  userId: {
    get: {
      operationId: "getBundleQueues",
      summary: "Gets all user bundleQueues",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user that owns the bundleQueue",
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
  bundleQueueId: {
    delete: {
      operationId: "deleteBundleQueue",
      summary: "Deletes a single bundleQueue",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "bundleQueueId",
          "in": "path",
          "description": "Id of the bundleQueue",
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

module.exports = bundleQueue;
