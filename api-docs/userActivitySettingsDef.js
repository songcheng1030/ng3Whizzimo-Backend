const userActivitySettings = {
    post: {
        post: {
            operationId: "postUserActivitySettings",
            summary: "Creates User Activity Settings",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "userId",
                    "in": "path",
                    "description": "userId of User",
                },
                {
                    "name": "userActivitySettings",
                    "in": "body",
                    "description": "userActivitySettings Object",
                    "required": true,
                    "schema": {
                        "type": "object",
                        "required": []
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
    copy: {
        post: {
            operationId: "copyUserActivitySettings",
            summary: "Copies a users Settings",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "userActivitySettingsId",
                    "in": "path",
                    "description": "Id of userActivitySettings",
                    "type": "string",
                    "required": true,
                },
                {
                    "name": "ownerKey",
                    "in": "body",
                    "description": "ownerKey Object",
                    "required": true,
                    "schema": {
                        "type": "object",
                        "required": []
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
    userId: {
        get: {
            operationId: "getAllUserActivitySettings",
            summary: "Gets all user activity settings for user",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "userId",
                    "in": "path",
                    "description": "Id of user that these settings belong to",
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
    userActivitySettingsId: {
        get: {
            operationId: "getUserActivitySettings",
            summary: "Gets a single user activity Settings object",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "userActivitySettingsId",
                    "in": "path",
                    "description": "Id of the user activity settings",
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
            operationId: "putUserActivitySettings",
            summary: "Updates a users Settings",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "userActivitySettingsId",
                    "in": "path",
                    "description": "Id of userActivitySettings",
                    "type": "string",
                    "required": true,
                },
                {
                    "name": "userActivitySettings",
                    "in": "body",
                    "description": "userActivitySettings Object",
                    "required": true,
                    "schema": {
                        "type": "object",
                        "required": []
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
            operationId: "deleteUserActivitySettings",
            summary: "deletes a single user activity Settings object",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "userActivitySettingsId",
                    "in": "path",
                    "description": "Id of the user activity settings",
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
    updateCurrent: {
        put: {
            operationId: "putCurrentUserActivitySetting",
            summary: "Updates which setting is currently active",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "userActivitySettingsId",
                    "in": "path",
                    "description": "Id of userActivitySettings",
                    "type": "string",
                    "required": true,
                },
                {
                    "name": "userId",
                    "in": "path",
                    "description": "userActivitySettings Object",
                    "required": true,
                    "schema": {
                        "type": "object",
                        "required": []
                    }
                },
            ],
            "responses": {
                "200": {
                    "description": "200 300 response"
                }
            }
        },
    }
};

module.exports = userActivitySettings;
