const courseWorkbookActivityDef = {
    courseWorkbookActivityId: {
        put: {
            operationId: "putCourseWorkbookActivity",
            summary: "Updates a course workbook activity",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "courseWorkbookActivityId",
                    "in": "path",
                    "description": "Id of the course workbook activity",
                    "type": "string",
                    "required": true,
                },
                {
                    "name": "courseWorkbookActivity",
                    "in": "body",
                    "description": "Course Workbook Activity Object",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "words": {
                                "type": "array",
                                "example": [
                                    {
                                        "word": "test",
                                        "wordid": 10
                                    },
                                    {
                                        "word": "brew",
                                        "wordid": 1129
                                    },
                                ]
                            },
                            "numWords": {
                                "type": "number"
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
    courseWorkbookId: {
        get: {
            operationId: "getCourseWorkbookActivity",
            summary: "Gets activity data for a workbook",
            produces: [
                "application/json"
            ],
            parameters: [
                {
                    "name": "courseWorkbookId",
                    "in": "path",
                    "description": "Id of course workbook the course belongs to",
                    "type": "string",
                    "required": true,
                },
                {
                    "name": "activityTypeId",
                    "in": "path",
                    "description": "Id of activity type of th course workbook activity",
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

module.exports = courseWorkbookActivityDef;
