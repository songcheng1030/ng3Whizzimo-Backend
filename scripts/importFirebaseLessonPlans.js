const _ = require('lodash');
const ObjectId = require('bson-objectid');
run();

async function run() {

    const {db} = await require('./../db');
    const lp1 = require('./lessonplans-jz1mCf.json');
    const lp2 = require('./lessonplans-koWQTW.json');
    const lp3 = require('./lessonplans-YFWzoO.json');
    const lp4 = require('./lessonplans-YWhvV5.json');
    const firebaseLessonPlans = {...lp1, ...lp2, ...lp3, ...lp4};
    const firebaseUsers = require('./users.json');
    const firebaseCourses = require('./students.json');

    let lessonPlan;
    try {
        lessonPlan = db.collection('lessonPlan');
        await lessonPlan.deleteMany({});
        importLessonPlans();
    } catch (error) {
        lessonPlan = db.createCollection('lessonPlan');
        importLessonPlans();
    }


    async function importLessonPlans() {
        let coursesOrigKeyDict = _.groupBy(Object.keys(firebaseCourses).map(key => {
            const c = firebaseCourses[key];
            c._id = key;
            return c;
        }).filter(course => course.origCourseKey), c => c.origCourseKey);
        let subCoursePlans = []
        // let test = Object.values(firebaseUsers['WhizzimoAcademy:21096'].lessonplans)
        //     .filter(lp => {
        //        return lp.courseId === "-MP-iTumQyF9jmIw-Mwv";
        //     });
        let lessonPlans = Object.keys(firebaseLessonPlans)
            .filter(lpKey => {
                if(lpKey === "-K_6-7N_1JfZSR_vs7R2") {
                    let test = ""
                }
                let lp = firebaseLessonPlans[lpKey];
                let course = firebaseCourses[lp.courseId]
                if (!course && !lp.teacherKey) {
                    return false;
                }
                let teacherKey = lp.teacherKey || course.teacherKey;
                const user = firebaseUsers[teacherKey];
                if(!user || !user.lessonplans) {
                    return false;
                }
                const lps = Object.keys(user.lessonplans);
                const lpIndex = lps.indexOf(lpKey);

                return lpIndex >= 0;
            })
            .map(lpKey => {
                let lp = firebaseLessonPlans[lpKey];
                lp.firebaseid = lpKey;
                if(lp.lessons) {
                    lp.lessons = Object.keys(lp.lessons).map(key => {
                        return lp.lessons[key];
                    });
                }

                return lp;
            });

        lessonPlans.forEach(lp => {
                const c = coursesOrigKeyDict[lp.courseId];
                const t = coursesOrigKeyDict["-MP-iTumQyF9jmIw-Mwv"];
                if(c) {
                    if(lp.courseId === "-MP-iTumQyF9jmIw-Mwv") {
                       let t = ''
                    }
                    c.forEach(subCourse => {
                        if(c === subCourse.courseId) return;
                        let newLessonPlan = {...lp, ...{}};
                        newLessonPlan.firebaseid = ObjectId();
                        newLessonPlan.teacherKey = subCourse.teachserKey
                        newLessonPlan.courseId = subCourse._id

                        if(subCourse._id === "-MP-iTumQyF9jmIw-Mwv") {
                            let b = ""
                        }

                        subCoursePlans.push(newLessonPlan);
                    });
                }
            });

        subCoursePlans = subCoursePlans.filter(sclp => !lessonPlans.find(lp => lp.name === sclp.name && sclp.courseId === lp.courseId));
        let test2 = lessonPlans.concat(subCoursePlans).filter(lp => lp.courseId === '-MP-iTumQyF9jmIw-Mwv');

        await lessonPlan.insertMany(lessonPlans.concat(subCoursePlans));

        console.log("firebase lesson plans imported successfully!");
        process.exit(0);
    }
}
