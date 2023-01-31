const course = {
  post: {
    post: {
      operationId: "postCourse",
      summary: "Creates New course",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "course",
          "in": "body",
          "description": "Course Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "firstname",
              "teacherKey",
              "courseType"
            ],
            "properties": {
              "firstname": {
                "type": "string"
              },
              "teacherKey": {
                "type": "string"
              },
              "notes": {
                "type": "string"
              },
              "courseType": {
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
      operationId: "getCourses",
      summary: "Gets all user courses",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "userId",
          "in": "path",
          "description": "Id of user that owns the course",
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
  sharedKey: {
    get: {
      operationId: "getCourseBySharedKey",
      summary: "Get shared course",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "sharedKey",
          "in": "path",
          "description": "sharedKey of a course",
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
      operationId: "getCourse",
      summary: "Gets a single course",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseId",
          "in": "path",
          "description": "Id of the course",
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
      operationId: "putCourse",
      summary: "Updates a single course",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseId",
          "in": "path",
          "description": "Id of the course",
          "type": "string",
          "required": true,
        },
        {
          "name": "course",
          "in": "body",
          "description": "Course Object",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "firstname": {
                "type": "string"
              },
              "notes": {
                "type": "string"
              },
              "courseType": {
                "type": "string"
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
      operationId: "deleteCourse",
      summary: "Deletes a single course",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseId",
          "in": "path",
          "description": "Id of the course",
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
  courseCopy: {
    post: {
      operationId: "copyCourse",
      summary: "Copies a single course",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseId",
          "in": "path",
          "description": "Id of the course",
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

module.exports = course;
