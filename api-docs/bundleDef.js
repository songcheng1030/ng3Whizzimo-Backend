const bundle = {
  post: {
    post: {
      operationId: "postBundle",
      summary: "Creates New bundle",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "bundle",
          "in": "body",
          "description": "Bundle Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "ownerKey",
              "bundleItems",
              "type",
              "name"
            ],
            "properties": {
              "type": {
                "type": "string"
              },
              "ownerKey": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "bundleItems": {
                "type": "array"
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
  multipleCreate: {
    post: {
      operationId: "multipleCreateBundle",
      summary: "Create Multiple bundle",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "bundles",
          "in": "body",
          "description": "Bundles Array",
          "required": true,
          "schema": {
            "type": "array",
            "items": {
              "properties": {
                "bundleId": {
                  "type": "string"
                },
                "bundleCode": {
                  "type": "string"
                },
                "userId": {
                  "type": "string"
                }
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
  apply: {
    post: {
      operationId: "Apply Bundle",
      summary: "Applies bundle",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "bundleDetails",
          "in": "body",
          "description": "Bundle Details Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "bundleId",
              "bundleCode",
              "userId",
            ],
            "properties": {
              "bundleId": {
                "type": "string"
              },
              "bundleCode": {
                "type": "string"
              },
              "userId": {
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
      operationId: "getBundles",
      summary: "Gets all user bundles",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user that owns the bundle",
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
  bundleId: {
    get: {
      operationId: "getBundle",
      summary: "Gets a single bundle",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "bundleId",
          "in": "path",
          "description": "Id of the bundle",
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
      operationId: "putBundle",
      summary: "Updates a single bundle",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "bundleId",
          "in": "path",
          "description": "Id of the bundle",
          "type": "string",
          "required": true,
        },
        {
          "name": "bundle",
          "in": "body",
          "description": "Bundle Object",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "bundleItems": {
                "type": "array"
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
      operationId: "deleteBundle",
      summary: "Deletes a single bundle",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "bundleId",
          "in": "path",
          "description": "Id of the bundle",
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

module.exports = bundle;
