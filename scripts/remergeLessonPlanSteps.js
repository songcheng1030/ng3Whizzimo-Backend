const _ = require('lodash');
const objectId = require('bson-objectid');
run();

async function run() {
    const {db, lessonPlans, lessonPlanSteps} = await require('../db');
    try {
        const lessonPlanStepsByLessonPlanId = _.groupBy(await lessonPlanSteps.find().toArray(), lps => lps.lessonPlanId);
        const ids = Object.keys(lessonPlanStepsByLessonPlanId);
        for(let i = 0; i < ids.length; i++) {
            const lessonPlanId = objectId.isValid(ids[i]) ? objectId(ids[i]) : ids[i]
            const lessonPlanStepsObjectId = lessonPlanStepsByLessonPlanId[lessonPlanId].map(lps => lps._id.toString());

            await lessonPlans.updateOne(
                {_id: lessonPlanId},
                {
                    $set: {
                        lessonPlanSteps: lessonPlanStepsObjectId
                    }
                }
            );

            console.log(`${i/(ids.length - 1) * 100}%`);
        }

        await lessonPlans.updateMany(
            {lessonPlanSteps: {$exists: false}},
            {
                $set: {
                    lessonPlanSteps: []
                }
            }
        );

        console.log("Steps embeded successfully");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}
