import { inject, injectable, LazyServiceIdentifer } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import inversifyBaseConfig from '../../../inversify.base.config'
import ICourseWorkbookBusinessManager from '../ICourseWorkbookBusinessManager'
import TYPES from '../../../types'
import ICourseWorkbookDataManager from '../../dataManagers/ICourseWorkbookDataManager'
import { Errors } from '../../constants/Errors'
import ILessonPlanStepBusinessManager from '../ILessonPlanStepBusinessManager'
import ICourseBusinessManager from '../ICourseBusinessManager'
import IWordBusinessManager from '../IWordBusinessManager'
import IWorkbookBusinessManager from '../IWorkbookBusinessManager'
import ILessonPlanDataManager from '../../dataManagers/ILessonPlanDataManager'
import ILessonPlanStepDataManager from '../../dataManagers/ILessonPlanStepDataManager'
import { course, courseWorkbookActivity } from '../../db'
import ICourseWorkbookActivityBusinessManager from '../ICourseWorkbookActivityBusinessManager'
import IWorkbookDataManager from '../../dataManagers/IWorkbookDataManager'
import IProxyWorkbookBusinessManager from '../IProxyWorkbookBusinessManager'

@injectable()
class CourseWorkbookBusinessManager implements ICourseWorkbookBusinessManager {
  private _courseWorkbookDataManager: ICourseWorkbookDataManager
  private _wordBusinessManager: IWordBusinessManager
  private _lessonPlanStepDataManager: ILessonPlanStepDataManager
  private _courseWorkbookActivityBusinessManager: ICourseWorkbookActivityBusinessManager
  private _workbookDataManager: IWorkbookDataManager
  private _proxyWorkbookBusinessManager: IProxyWorkbookBusinessManager

  constructor (
    @inject(TYPES.CourseWorkbookDataManager)
    courseWorkbookDataManager: ICourseWorkbookDataManager,
    @inject(TYPES.WordBusinessManager)
    wordBusinessManager: IWordBusinessManager,
    @inject(TYPES.LessonPlanStepDataManager)
    lessonPlanStepDataManager: ILessonPlanStepDataManager,
    @inject(TYPES.CourseWorkbookActivityBusinessManager)
    courseWorkbookActivityBusinessManager: ICourseWorkbookActivityBusinessManager,
    @inject(TYPES.WorkbookDataManager)
    workbookDataManager: IWorkbookDataManager,
    @inject(TYPES.ProxyWorkbookBusinessManager)
    proxyWorkbookBusinessManger: IProxyWorkbookBusinessManager
  ) {
    this._lessonPlanStepDataManager = lessonPlanStepDataManager
    this._courseWorkbookDataManager = courseWorkbookDataManager
    this._wordBusinessManager = wordBusinessManager
    this._courseWorkbookActivityBusinessManager = courseWorkbookActivityBusinessManager
    this._workbookDataManager = workbookDataManager
    this._proxyWorkbookBusinessManager = proxyWorkbookBusinessManger
  }

  create (data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!data.workbookId || !data.courseId) {
        return reject(Errors.missingParametersBody)
      }

      this._courseWorkbookDataManager
        .create(data)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error.message))
    })
  }

  delete (id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._courseWorkbookDataManager
        .delete(id)
        .then(() => {
          return this._courseWorkbookDataManager.delete(id)
        })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error))
    })
  }

  get (id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._courseWorkbookDataManager
        .get(id)
        .then((result: any) => {
          result.courseName = result.courseName
          resolve(result)
        })
        .catch((error: any) => reject(error))
    })
  }

  getMany (id: string): Promise<any> {
    console.log('1')
    return new Promise((resolve, reject) => {
      this._courseWorkbookDataManager
        .getMany(id)
        .then((results: any[]) => {
          results = results.map(result => {
            result.name
            return result
          })
          return resolve(results)
        })
        .catch((error: any) => reject(error))
    })
  }

  protectedDelete (id: string, locals: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validateOwner(id, locals)
        .then(() => this.delete(id))
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error))
    })
  }

  protectedUpdate (id: string, data: any, locals: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.validateOwner(id, locals)
        .then(() => this.update(id, data))
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error))
    })
  }

  update (id: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      delete data.workbookKey
      delete data.courseid

      this._courseWorkbookDataManager
        .update(id, data)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error.message))
    })
  }

  validateOwner (courseWorkbookId: string, locals: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (locals.admin) {
        return resolve(null)
      }

      this._courseWorkbookDataManager
        .get(courseWorkbookId)
        .then((result: any) => {
          if (!result || result.ownerKey !== locals.userId) {
            return reject(Errors.notAuthorized)
          }

          resolve('OK')
        })
    })
  }

  deleteByWorkbookId (workbookId: string): Promise<any> {
    return this._courseWorkbookDataManager.deleteByWorkbookId(workbookId)
  }

  getByCourseId (courseId: string): Promise<any> {
    return this._courseWorkbookDataManager.getByCourseId(courseId)
  }

  protectedCreate (data: any, locals: any): Promise<any> {
    return new Promise((resolve, reject) => {
      data.owner = locals.userId

      this.create(data)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error))
    })
  }
  updateByWorkbook(id: string, workbookId: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        delete data.workbookKey;
        delete data.courseid;
        // delete data._id
        console.log('DID YOU GET THIS?', data)
        this._courseWorkbookDataManager
            .updateByWorkbook(id, workbookId, data)
            .then((result: any) => resolve(result))
            .catch((error: any) => reject(error.message));
    })
}

  copy (
    courseWorkbookId: string,
    courseId: string = null,
    ownerKey: string = null,
    changeName = true
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let originalCourseWorkbook: any
      let newCourseWorkbook: any
      let workbookName = ''
      this.getNonMerged(courseWorkbookId)
        .then(courseWorkbook => {
          courseWorkbook.oldId = courseWorkbook._id
          delete courseWorkbook._id
          if (courseId) {
            courseWorkbook.courseId = courseId
          }

          if (ownerKey) {
            courseWorkbook.ownerKey = ownerKey
          }

          newCourseWorkbook = courseWorkbook

          return this._workbookDataManager.get(courseWorkbook.workbookId)
        })
        .then(workbook => {
          if (changeName) {
            newCourseWorkbook.name = `${workbook.name} (copy)`
          }

          return this._proxyWorkbookBusinessManager.copy(
            workbook._id,
            newCourseWorkbook.ownerKey,
            changeName
          )
        })
        .then(newWorkbook => {
          newCourseWorkbook.workbookId = newWorkbook._id
          return this.create(newCourseWorkbook)
        })
        .then(result => {
          newCourseWorkbook = result
          return this._courseWorkbookActivityBusinessManager.getByCourseWorkbookId(
            courseWorkbookId
          )
        })
        .then(courseWorkbookActivities => {
          const requests = courseWorkbookActivities.map(
            (courseWorkbookActivity: any) => {
              return this._courseWorkbookActivityBusinessManager.copy(
                courseWorkbookActivity._id,
                newCourseWorkbook._id
              )
            }
          )

          return Promise.all(requests)
        })
        .then((result: any) => {
          resolve(newCourseWorkbook)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  getNonMerged (id: string): Promise<any> {
    return this._courseWorkbookDataManager.getNonMerged(id)
  }

  deleteFromCourseWorkbookByWorkbookId (
    workbookId: string,
    courseId: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this._courseWorkbookDataManager
        .deleteFromCourseWorkbookByWorkbookId(workbookId, courseId)
        .then(() => resolve(null))
        .catch(error => reject(error))
    })
  }

  getCountByWorkbookId (workbookId: string): Promise<any> {
    return this._courseWorkbookDataManager.getCountByWorkbookId(workbookId)
  }
}

export { CourseWorkbookBusinessManager }
