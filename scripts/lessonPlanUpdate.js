const _ = require('lodash');
run();

async function run() {
    const {db, lessonPlan, course} = await require('./../db');
    const firebaseUsers = require('./users');

    let lessonPlans;
    try {
        lessonPlans = db.collection('lessonPlans');
        await lessonPlans.deleteMany({});
        mongoInsert();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    async function mongoInsert() {
        let lps = await lessonPlan.find().toArray();

        if(!lps || lps.length === 0) {
            return console.error('No Lesson Plans Found');
        }

        const courses = await course.find().toArray();
        let courseDict = {};
        courses.forEach(c => {
            courseDict[c._id] = c;
        })

        let coursesOrigKeyDict = _.groupBy(courses.filter(course => course.origCourseKey), c => c.origCourseKey);

        const newLessonPlans = []

        for(let i = 0; i < lps.length; i++) {
            let lp = lps[i];
            const c = courseDict[lp.courseId];
            if (!c) continue;
            const owner = firebaseUsers[c.teacherKey];

            let newLessonPlan = {
                _id: lp.firebaseid,
                order: owner && owner.lessonplans && owner.lessonplans[lp.firebaseid] ? owner.lessonplans[lp.firebaseid]['.priority'] : lp.lessonNum,
                courseId: c._id,
                name: lp.name,
                notes: lp.notes,
                status: lp.status,
                ownerKey: c.teacherKey
            };

            // if(newLessonPlan.courseId) {
            //     newLessonPlan.ownerKey = c.teacherKey;
            //
            //     newLessonPlans.push(newLessonPlan);
            // }



            newLessonPlans.push(newLessonPlan);
        }

        await lessonPlans.insertMany(newLessonPlans);


        console.log("New lessonPlans collection created successfully!");
        process.exit(0);
    }

}
