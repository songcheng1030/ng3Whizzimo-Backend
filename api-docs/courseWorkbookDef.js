const courseWorkbook = {
  post: {
    post: {
      operationId: "postCourseWorkbook",
      summary: "Creates New Course Workbook",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseWorkbook",
          "in": "body",
          "description": "Course Workbook Object",
          "schema": {
            "type": "object",
            "required": [
              "workbookId",
              "courseId",
              "ownerKey"
            ],
            "properties": {
              "workbookId": {
                "example": "5e94a2d05742ac0c04258539",
                "type": "string"
              },
              "courseId": {
                "example": "5c3adf428a550932fc54bd30",
                "type": "string"
              },
              "ownerKey": {
                "example": "WhizzimoAcademy:159",
                "type": "string"
              },
              "order": {
                "example": 21,
                "type": "integer"
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
  workbookId: {
    get: {
      operationId: "getCourseWorkbooks",
      summary: "Gets all the workbooks for a course",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of workbook the course belongs to",
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
  courseId: {
    get: {
      operationId: "getCourseWorkbooks",
      summary: "Gets all course workbooks",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseId",
          "in": "path",
          "description": "Id of the course the workbook belongs to",
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
  workbookIdCourseId: {
    delete: {
      operationId: "deleteFromCourseWorkbookByWorkbookId",
      summary: "Deletes a single courseWorkbook by course id and course workbook id",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of the workbook that this course workbook represents",
          "type": "string",
          "required": true,
        },
        {
          "name": "courseId",
          "in": "path",
          "description": "Id of the course that the courseworkbook belongs to",
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
  courseWorkbookId: {
    get: {
      operationId: "getCourseWorkbook",
      summary: "Gets a single course workbook",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseWorkbookId",
          "in": "path",
          "description": "Id of the course workbook",
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
      operationId: "putCourseWorkbook",
      summary: "Updates a single course workbook",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseWorkbookId",
          "in": "path",
          "description": "Id of the course workbook",
          "type": "string",
          "required": true,
        },
        {
          "name": "courseWorkbook",
          "in": "body",
          "description": "Course Workbook Object",
          "schema": {
            "type": "object",
            "properties": {
              "order": {
                "example": 3,
                "type": "integer"
              },
              "shared": {
                "example": false,
                "type": "boolean"
              },
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
      operationId: "deleteCourseWorkbook",
      summary: "Deletes a single courseWorkbook",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseWorkbookId",
          "in": "path",
          "description": "Id of the course workbook",
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
  copy: {
    post: {
      operationId: "putCourseWorkbook",
      summary: "Updates a single course workbook",
      produces: [
        "application/json"
      ],
      parameters: [{
        "name": "courseWorkbookId",
        "in": "path",
        "description": "Id of the course workbook",
        "type": "string",
        "required": true,
      }],
      "responses": {
        "200": {
          "description": "200 300 response"
        }
      }
    },
  },
  count: {
    get: {
      operationId: "getCourseWorkbookCountByWorkbookId",
      summary: "Gets the count of the course workbooks with the supplied workbook id",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "workbookId",
          "in": "path",
          "description": "Id of workbook that the course workbook belongs to",
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

module.exports = courseWorkbook;
