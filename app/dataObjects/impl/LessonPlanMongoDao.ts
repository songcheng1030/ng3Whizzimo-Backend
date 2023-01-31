import { injectable, typeConstraint } from "inversify";
const ObjectId = require("bson-objectid");
const { lessonPlans, lessonPlanSteps } = require("../../db");
import ILessonPlanBase from "../../shared/ILessonPlanBase";
import { course, lessonPlan } from "../../db";
import ObjectID from "bson-objectid";

@injectable()
class LessonPlanMongoDao implements ILessonPlanBase {
  create(data: any): Promise<any> {
    data.courseId = ObjectId.isValid(data.courseId)
      ? ObjectId(data.courseId)
      : data.courseId;
    data.lessonPlanSteps = [];
    return new Promise((resolve, reject) => {
      lessonPlans
        .insert(data)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  delete(id: string): Promise<any> {
    id = ObjectId.isValid(id) ? ObjectId(id) : id;
    return new Promise((resolve, reject) => {
      lessonPlans
        .remove({ _id: id })
        .then((result: any) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  get(lessonPlanId: string): Promise<any> {
    lessonPlanId = ObjectId.isValid(lessonPlanId)
      ? ObjectId(lessonPlanId)
      : lessonPlanId;
    return new Promise((resolve, reject) => {
      lessonPlans
        .find({ _id: lessonPlanId })
        .then((result: any) => {
          if (result.length === 0) {
            return resolve(null);
          }

          resolve(result[0]);
        })
        .catch((error: any) => reject(error));
    });
  }

  getManyWithSteps(courseId: string): Promise<any> {
    courseId = ObjectId.isValid(courseId) ? ObjectId(courseId) : courseId;
    return new Promise((resolve, reject) => {
      lessonPlans
        .aggregate([
          //   { $unwind: "$lessonPlanSteps" },

          {
            $addFields: {
              lessonPlanStepsArr: {
                $map: {
                  input: "$lessonPlanSteps",
                  in: { $toObjectId: "$$this" },
                },
              },
            },
          },
          {
            $lookup: {
              from: "lessonPlanStep",
              localField: "lessonPlanStepsArr",
              foreignField: "_id",
              as: "lessonPlanStepsWithWorkbook",
            },
          },
          {
            $project: {
              name: 1,
              courseId: 1,
              order: 1,
              ownerKey: 1,
              lessonPlanSteps: 1,
              lessonPlanStepsWithWorkbook: 1,
            },
          },
          { $match: { courseId } },
        ])
        .then((result: any) => {
          result.lessonPlanStepCount = result.lessonPlanSteps
            ? result.lessonPlanSteps.length
            : 0;
          delete result.lessonPlanSteps;
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getMany(courseId: string): Promise<any> {
    courseId = ObjectId.isValid(courseId) ? ObjectId(courseId) : courseId;
    return new Promise((resolve, reject) => {
      lessonPlans
        .find({ courseId: courseId })
        .then((result: any) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  update(id: string, data: any): Promise<any> {
    id = ObjectId.isValid(id) ? ObjectId(id) : id;
    return new Promise((resolve, reject) => {
      lessonPlans
        .update({ _id: id }, { $set: data })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  deleteByCourseId(courseId: string): Promise<any> {
    courseId = ObjectId.isValid(courseId) ? ObjectId(courseId) : courseId;
    return lessonPlans.remove({ courseId: courseId });
  }

  getManyIds(id: string): Promise<any> {
    id = ObjectId.isValid(id) ? ObjectId(id) : id;
    return lessonPlans.find({ _id: id }, { _id: 1 });
  }

  createLessonPlanStep(data: any): Promise<any> {
    return lessonPlans.update(
      { _id: data.lessonPlanId },
      { $push: { lessonPlanSteps: data._id.toString() } }
    );
  }

  deleteLessonPlanStep(
    lessonPlanId: string,
    lessonPlanStepId: string
  ): Promise<any> {
    return lessonPlans.update(
      { _id: lessonPlanId },
      { $pull: { lessonPlanSteps: lessonPlanStepId.toString() } }
    );
  }

  getFirstLessonPlanStep(lessonPlanId: string): Promise<any> {
    lessonPlanId = ObjectId.isValid(lessonPlanId)
      ? ObjectId(lessonPlanId)
      : lessonPlanId;
    return new Promise((resolve, reject) => {
      lessonPlanSteps
        .find({ lessonPlanId: lessonPlanId })
        .then((results: any) => {
          if (results.length === 0) {
            return resolve(null);
          }
          const sorted = results.sort((a: any, b: any) => {
            if (a.order < b.order) {
              return -1;
            }

            if (a.order > b.order) {
              return 1;
            }

            return 0;
          });

          resolve(sorted[0]);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

export { LessonPlanMongoDao };
