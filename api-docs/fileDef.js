const fileDef = {
    post: {
        post: {
            operationId: "postFile",
            summary: "Creates New File",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "file",
                    "in": "body",
                    "description": "File Object",
                    "required": true,
                    "schema": {
                        "type": "object",
                        "required": [
                            "file",
                            "ownerKey",
                            "name"
                        ],
                        "properties": {
                            "file": {
                                "type": "string",
                                "example": "base64 string"

                            },
                            "ownerKey": {
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

    },
    multi: {
        post: {
            operationId: "postFiles",
            summary: "Creates New Files",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "files",
                    "in": "body",
                    "description": "Files array",
                    "required": true,
                    "schema": {
                        "type": "array",
                        "items": {
                            "properties": {
                                "file": {
                                    "type": "string",
                                    "example": "base64 string"

                                },
                                "ownerKey": {
                                    "type": "string"
                                },
                                "name": {
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
    fileId: {
        get: {
            operationId: "getFile",
            summary: "Gets a single file",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "fileId",
                    "in": "path",
                    "description": "Id of the file",
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
        delete: {
            operationId: "deleteFile",
            summary: "Deletes a single file",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "fileId",
                    "in": "path",
                    "description": "Id of the file",
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
    userId: {
        get: {
            operationId: "getFiles",
            summary: "Gets all user files",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "userId",
                    "in": "path",
                    "description": "Id of user that owns the file",
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

module.exports = fileDef
