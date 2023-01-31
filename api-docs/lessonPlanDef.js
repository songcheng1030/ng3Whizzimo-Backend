const lessonPlan = {
  post: {
    post: {
      operationId: "postLessonPlan",
      summary: "Creates New lessonPlan",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlan",
          "in": "body",
          "description": "Lesson Plan Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "courseId",
              "name",
            ],
            "properties": {
              "name": {
                "type": "string"
              },
              "courseId": {
                "type": "string"
              },
              "order": {
                "type": "number"
              },
              "status": {
                "type": "string"
              },
              "notes": {
                "type": "string"
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
    }
  },
  courseId: {
    get: {
      operationId: "getLessonPlans",
      summary: "Gets all lessonPlans for course",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseId",
          "in": "path",
          "description": "Id of course that owns the lessonPlan",
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
  courseIdSteps: {
    get: {
      operationId: "getLessonPlansWithSteps",
      summary: "Gets all lessonPlans for course with steps",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "courseId",
          "in": "path",
          "description": "Id of course that owns the lessonPlan",
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
  lessonPlanId: {
    get: {
      operationId: "getlessonPlan",
      summary: "Gets a single lessonPlan",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanId",
          "in": "path",
          "description": "Id of the lessonPlan",
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
      operationId: "putLessonPlan",
      summary: "Updates a single lessonPlan",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanId",
          "in": "path",
          "description": "Id of the lessonPlan",
          "type": "string",
          "required": true,
        },
        {
          "name": "lessonPlan",
          "in": "body",
          "description": "Lesson Plan Object",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "order": {
                "type": "number"
              },
              "status": {
                "type": "string"
              },
              "notes": {
                "type": "string"
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
      operationId: "deleteLessonPlan",
      summary: "Deletes a single lessonPlan",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanId",
          "in": "path",
          "description": "Id of the lessonPlan",
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
      operationId: "copyLessonPlan",
      summary: "Copies Existing lessonPlan",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanId",
          "in": "path",
          "description": "Id of lessonPlan to be copied",
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

module.exports = lessonPlan;
