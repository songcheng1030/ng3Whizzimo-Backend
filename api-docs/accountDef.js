const account = {
  auth0: {
    user: {
      get: {
        operationId: "getAuth0User",
        summary: "Gets an auth0 user",
        produces: [
          "application/json"
        ],
        parameters: [
          {
              "name": "userId",
              "in": "path",
              "description": "Id of the user",
              "type": "string",
              "required": true,
          },
        ],
        "responses": {
          "200": {
            "description": "200 300 response"
          }
        }
      },
      clever: {
        get: {
          operationId: "getAuth0UserIsClever",
          summary: "Returns whether a user is using clever",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              "name": "emailAddress",
              "in": "path",
              "description": "email address of the user",
              "type": "string",
              "required": true,
            },
          ],
          "responses": {
            "200": {
              "description": "200 300 response"
            }
          }
        }
      },
      resetPassword: {
        post: {
          operationId: "postAuth0ResetPassword",
          summary: "Sends password reset email to user",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              "name": "emailAddress",
              "in": "path",
              "description": "email address of the user",
              "type": "string",
              "required": true,
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
  },
  customer: {
    get: {
      operationId: "getCustomer",
      summary: "Gets a customer",
      produces: [
        "application/json"
      ],
        parameters: [
            {
                "name": "customerId",
                "in": "path",
                "description": "Id of the customer",
                "type": "string",
                "required": true,
            },
        ],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    },
    put: {
      operationId: "putCustomer",
      summary: "Updates an account",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "customerId",
          "in": "path",
          "description": "Id of the customer",
          "type": "string",
          "required": true,
        },
        {
          "name": "payment account",
          "in": "body",
          "description": "Customer Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [],
            "properties": {
              "account_balance": {
                  "type": "number"
              },
              "address": {
                  "type": "object"
              },
              "balance": {
                "type": "number"
              },
              "email": {
                  "type": "string"
              },
              "name": {
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
      operationId: "deleteCustomer",
      summary: "Deletes a customer account",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "customerId",
          "in": "path",
          "description": "Id of the customer",
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
  card: {
    post: {
      operationId: "postCard",
      summary: "Creates a customer credit card",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "customerId",
          "in": "path",
          "description": "Id of the customer",
          "type": "string",
          "required": true,
        },
        {
          "name": "cardInfo",
          "in": "body",
          "description": "Credit Card Info",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
                "token"
            ],
            "properties": {
              token: {
                type: "string"
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
  cardMulti: {
    delete: {
      operationId: "deleteCustomer",
      summary: "Deletes a customer account",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "customerId",
          "in": "path",
          "description": "Id of the customer",
          "type": "string",
          "required": true,
        },
        {
          "name": "cardId",
          "in": "path",
          "description": "Id of the card",
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
  promo: {
    get: {
      operationId: "getPromo",
      summary: "Gets the promotion details",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "promoId",
          "in": "path",
          "description": "Id of promotion",
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
  promoCustDelete:{
    delete: {
      operationId: "deleteCustomerPromo",
      summary: "Deletes a promotional coupon applied to all of a user's subscriptions",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "customerId",
          "in": "path",
          "description": "Id of the customer",
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
  promoSubDelete:{
    delete: {
      operationId: "deleteSubscriptionPromo",
      summary: "Deletes a promotional coupon applied to a single subscription",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "subscriptionId",
          "in": "path",
          "description": "Id of the subscription",
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
  subscriptionCust: {
    put: {
      operationId: "putSubscription",
      summary: "Applies a plan to the customers account",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "customerId",
          "in": "path",
          "description": "Id of the customer",
          "type": "string",
          "required": true,
        },
        {
          "name": "submission",
          "in": "body",
          "description": "Customer Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": ["planId"],
            "properties": {
              planId: {type: 'string'},
              promoId: {type: 'string'},
              isDowngrade: {type: 'boolean'},
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
  },
  scheduledSubscriptionEnd: {
    delete: {
      operationId: "deletesScheduledSubscription",
      summary: "Cancels a scheduled subscription",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "scheduledSubscriptionId",
          "in": "path",
          "description": "Id of the scheduled Subscription",
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
  subscriptionEnd: {
    put: {
      operationId: "deleteSubscriptionAtEndOfBillingPeriod",
      summary: "Cancels a subscription at the end of it's billing period",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "subscriptionId",
          "in": "path",
          "description": "Id of the customer",
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
  subscriptionSub: {
    delete: {
      operationId: "deleteSubscription",
      summary: "Cancels a subscription",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "subscriptionId",
          "in": "path",
          "description": "Id of the customer",
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
  products: {
    get: {
      operationId: "getProducts",
      summary: "Gets a list of products from stripe",
      produces: [
        "application/json"
      ],
      responses: {
        200: {
          "description": "200 300 response"
        }
      }
    }
  }
};

module.exports = account;
