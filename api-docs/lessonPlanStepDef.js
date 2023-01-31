const lessonPlanStep = {
  post: {
    post: {
      operationId: "postLessonPlanStep",
      summary: "Creates New LessonPlanStep",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanStep",
          "in": "body",
          "description": "Lesson Plan Object",
          "required": true,
          "schema": {
            "type": "object",
            "required": [
              "courseWorkbookId",
              "name",
              "lessonPlanId",
              "activity",
              "activityName",
              "words",
              "tiles"
            ],
            "properties": {
              "name": {
                "type": "string"
              },
              "lessonPlanId": {
                "type": "string"
              },
              "courseWorkbookId": {
                "type": "string"
              },
              "order": {
                "type": "number"
              },
              "words": {
                "example": [
                  {word: "stub", wordid: 17128},
                  {word: "still", wordid: 248},
                  {word: "step", wordid: 1334}
                ],
                "type": "array"
              },
              "tiles": {
                "example": [
                  "tiles.bv.a",
                  "tiles.bv.i",
                  "tiles.bc.s"
                ],
                "type": "array"
              },
              "activity": {
                "type": "string"
              },
              "activityName": {
                "type": "string"
              },
              "lined": {
                "type": "boolean"
              },
              "numWords": {
                "type": "number"
              },
              "ignoreWhizzimap": {
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
    }
  },
  lessonPlanId: {
    get: {
      operationId: "getLessonPlanSteps",
      summary: "Gets all lesson Plan Steps for the lesson",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanId",
          "in": "path",
          "description": "Id of lesson plan that owns the lessonPlanStep",
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
  lessonPlanStepId: {
    get: {
      operationId: "getLessonPlanStep",
      summary: "Gets a single lessonPlanStep",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanStepId",
          "in": "path",
          "description": "Id of the lessonPlanStep",
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
      operationId: "putLessonPlanStep",
      summary: "Updates a single lessonPlanStep",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanStepId",
          "in": "path",
          "description": "Id of the lessonPlanStep",
          "type": "string",
          "required": true,
        },
        {
          "name": "lessonPlanStep",
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
              "words": {
                "example": [
                  {word: "stub", wordid: 17128},
                  {word: "still", wordid: 248},
                  {word: "step", wordid: 1334}
                ],
                "type": "array"
              },
              "tiles": {
                "example": [
                  "tiles.bv.a",
                  "tiles.bv.i",
                  "tiles.bc.s"
                ],
                "type": "array"
              },
              "activity": {
                "type": "string"
              },
              "activityName": {
                "type": "string"
              },
              "lined": {
                "type": "boolean"
              },
              "numWords": {
                "type": "number"
              },
              "ignoreWhizzimap": {
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
      operationId: "deleteLessonPlanStep",
      summary: "Deletes a single lessonPlanStep",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanStepId",
          "in": "path",
          "description": "Id of the lessonPlanStep",
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
      operationId: "copyLessonPlanStep",
      summary: "Copies Existing lesson Plan Step",
      produces: [
        "application/json"
      ],
      parameters: [
        {
          "name": "lessonPlanId",
          "in": "path",
          "description": "Id of lessonPlan ste to be copied",
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
  count: {
    courseWorkbookId: {
      get: {
        operationId: "getLessonPlanStepsCountByCourseWorkbookId",
        summary: "Gets the count of the lesson plans with the supplied course workbook id",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            "name": "courseWorkbookId",
            "in": "path",
            "description": "Id of courseWorkbook that the lesson plan belongs to",
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
    workbookId: {
      get: {
        operationId: "getLessonPlanStepsCountByWorkbookId",
        summary: "Gets the count of the lesson plans with the supplied workbook id",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            "name": "workbookId",
            "in": "path",
            "description": "Id of workbook that the lesson plan belongs to",
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
  }
};

module.exports = lessonPlanStep;
