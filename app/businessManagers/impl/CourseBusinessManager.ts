import { inject, injectable } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import inversifyBaseConfig from '../../../inversify.base.config'
import ICourseBusinessManager from '../ICourseBusinessManager'
import ICourseDataManager from '../../dataManagers/ICourseDataManager'
import TYPES from '../../../types'
import ILessonPlanBusinessManager from '../ILessonPlanBusinessManager'
import IBundleContentBusinessManager from '../IBundleContentBusinessManager'
import ICourseWorkbookBusinessManager from '../ICourseWorkbookBusinessManager'
import ILessonPlanStepBusinessManager from '../ILessonPlanStepBusinessManager'
import { Errors } from '../../constants/Errors'
import IWorkbookBusinessManager from '../IWorkbookBusinessManager'
import { courseWorkbook } from '../../db'
import ICourseWorkbookActivityBusinessManager from '../ICourseWorkbookActivityBusinessManager'

@injectable()
class CourseBusinessManager implements ICourseBusinessManager {
  private _courseDataManager: ICourseDataManager
  private _bundleContentBusinessManager: IBundleContentBusinessManager

  private _lessonPlanBusinessManager: ILessonPlanBusinessManager
  private _lessonPlanStepBusinessManager: ILessonPlanStepBusinessManager
  private _courseWorkbookBusinessManager: ICourseWorkbookBusinessManager
  private _workbookBusinessManager: IWorkbookBusinessManager
  private _courseWorkbookActivityBusinessManager: ICourseWorkbookActivityBusinessManager

  constructor (
    @inject(TYPES.CourseDataManager) courseDataManager: ICourseDataManager,
    @inject(TYPES.BundleContentBusinessManager)
    bundleContentBusinessManager: IBundleContentBusinessManager,
    @inject(TYPES.LessonPlanBusinessManager)
    lessonPlanBusinessManager: ILessonPlanBusinessManager,
    @inject(TYPES.LessonPlanStepBusinessManager)
    lessonPlanStepBusinessManager: ILessonPlanStepBusinessManager,
    @inject(TYPES.CourseWorkbookBusinessManager)
    courseWorkbookBusinessManager: ICourseWorkbookBusinessManager,
    @inject(TYPES.WorkbookBusinessManager)
    workbookBusinessManager: IWorkbookBusinessManager,
    @inject(TYPES.CourseWorkbookActivityBusinessManager)
    CourseWorkbookActivityBusinessManager: ICourseWorkbookActivityBusinessManager
  ) {
    this._courseDataManager = courseDataManager
    this._bundleContentBusinessManager = bundleContentBusinessManager

    this._lessonPlanBusinessManager = lessonPlanBusinessManager
    this._lessonPlanStepBusinessManager = lessonPlanStepBusinessManager
    this._courseWorkbookBusinessManager = courseWorkbookBusinessManager
    this._workbookBusinessManager = workbookBusinessManager
  }

  create (data: any): Promise<any> {
    return this._courseDataManager.create(data)
  }

  delete (id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._lessonPlanBusinessManager
        .getMany(id)
        .then(results => {
          const lessonPlanIds = results
            ? results.map((lessonPlan: any) => lessonPlan._id)
            : []
          if (lessonPlanIds.length > 0) {
            return this._bundleContentBusinessManager.deleteManyByContentId(
              lessonPlanIds
            )
          }

          return null
        })
        .then(() => {
          return this._bundleContentBusinessManager.deleteByContentId(id)
        })
        .then(() => {
          return this._lessonPlanBusinessManager.deleteByCourseId(id)
        })
        .then(() => {
          return this._lessonPlanStepBusinessManager.delete(id)
        })
        .then(() => {
          return this._courseWorkbookBusinessManager.delete(id)
        })
        .then(() => {
          return this._courseDataManager.delete(id)
        })
        .then((result: any) => {
          return resolve(result)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  copy (
    courseId: string,
    ownerKey: string,
    changeName: boolean = true
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let newCourseId: any
      let newCourseWorkbooks: any
      let response: any = {}
      let highestOrder = 0
      this._courseDataManager
        .getMany(ownerKey)
        .then((courses: any[]) => {
          const courseOrderValues: number[] = courses.map(
            (course: any) => course.order
          )
          highestOrder = Math.max(...courseOrderValues)

          return this._courseDataManager.get(courseId)
        })
        .then((result: any) => {
          if (!result) reject(Errors.notFound('Course'))

          delete result._id
          result.teacherKey = ownerKey
          result.order = highestOrder + 1

          if (changeName) {
            result.courseName += ' (copy)'
          }

          return this._courseDataManager.create(result)
        })
        .then(courseCopy => {
          newCourseId = courseCopy._id
          response.course = courseCopy
          return this._courseWorkbookBusinessManager.getByCourseId(courseId)
        })
        .then(courseWorkbooks => {
          if (courseWorkbooks.length === 0) return
          const requests: any[] = courseWorkbooks.map((courseWorkbook: any) => {
            return this._courseWorkbookBusinessManager.copy(
              courseWorkbook._id,
              newCourseId,
              ownerKey,
              false
            )
          })
          return Promise.all(requests)
        })
        .then(courseWorkbooks => {
          if (!courseWorkbooks) return

          newCourseWorkbooks = courseWorkbooks
          response.courseWorkbooks = courseWorkbooks
          return this._lessonPlanBusinessManager.getMany(courseId)
        })
        .then((lessonPlans: any[]) => {
          if (!lessonPlans) return
          let requests: any[] = []

          lessonPlans.forEach(lessonPlan => {
            return requests.push(
              this._lessonPlanBusinessManager.copy(
                lessonPlan._id,
                newCourseId,
                newCourseWorkbooks,
                ownerKey,
                false
              )
            )
          })

          return Promise.all(requests)
        })
        .then(lessonPlans => {
          response.lessonPlans = lessonPlans
          resolve(response)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  get (id: string): Promise<any> {
    return this._courseDataManager.get(id)
  }

  getBySharedKey (sharedKey: string): Promise<any> {
    return this._courseDataManager.getBySharedKey(sharedKey)
  }

  getMany (userId: string): Promise<any> {
    return this._courseDataManager.getMany(userId)
  }

  update (id: string, data: any): Promise<any> {
    delete data.teacherKey
    delete data._id

    return this._courseDataManager.update(id, data)
  }

  validateCourseOwner (
    courseId: string,
    userId: string,
    isAdmin: boolean = false
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isAdmin) {
        return resolve(null)
      }

      this.get(courseId)
        .then((result: any) => {
          if (!result || result.teacherKey !== userId) {
            return reject(Errors.notAuthorized)
          }
          return resolve('OK')
        })
        .catch((error: any) => reject(error))
    })
  }
}

export { CourseBusinessManager }
