run();

async function run() {
    const {db} = await require('../db');

    let stripePlan;
    stripePlan = db.collection('stripePlan');
    stripePlan.deleteMany({})
        .then(() => {
            mongoInsert();
        })
        .catch(error => {
            process.exit(1);
        });

    activePlanIds = [
        'educator_1000s_1000wkbks',
        'educator_1s_1000wkbks',
        'educator_1s_25wkbks',
        'demo_1s_3wkbks'
    ];

    planIds = [
        'educator_15s_500wkbks',
        'educator_30s_500wkbks',
        'educator_30s_300wkbks',
        'educator_5s_200wkbks',
        'educator_10s_300wkbks',
        'educator_1s_25wkbks',
        'educator_3s_50wkbks',
        'educator_10s_100wkbks',
        'educator_50s_500wkbks',
        'educator_1000s_1000wkbks',
        'educator_1s_1000wkbks',
        'educator_20s_100wkbks',
        'demo_5s_300wkbks',
        'demo_1s_3wkbks',
        'staff_100s_1000wkbks',
        'student_monthly',
        'student_yearly'
    ];

    function mongoInsert() {
        let requests = planIds.map(planId => {
            return {
                _id: planId,
                active: activePlanIds.findIndex(activePlanId => activePlanId === planId) >= 0
            };
        });

        stripePlan
            .insertMany(requests)
            .then(() => {
                console.log('Stripe Plans Created Successfully!');

                return Promise.all([
                    stripePlan.updateOne({_id: "educator_1000s_1000wkbks"}, {$set: {price: "99.99",name: "Superhero Plus", "numActivities": 13, numCourses: 1000, numWorkbooks: 1000, createLessonPlans: true, shareContent: true}}),
                    stripePlan.updateOne({_id: "educator_1s_1000wkbks"}, {$set: {price: "79.99",name: "Superhero", "numActivities": 13, numCourses: 1, numWorkbooks: 1000, createLessonPlans: true, shareContent: true}}),
                    stripePlan.updateOne({_id: "educator_1s_25wkbks"}, {$set: {price: "39.99",name: "Hero", "numActivities": 7, numCourses: 1, numWorkbooks: 25, createLessonPlans: true, shareContent: true}}),
                    stripePlan.updateOne({_id: "demo_1s_3wkbks"}, {$set: {price: "Free",name: "Free", "numActivities": 3, numCourses: 1, numWorkbooks: 3, createLessonPlans: false, shareContent: false}})
                ])
            })
            .then(() => {
                console.log('Stripe Plans Updated Successfully!');
                process.exit(0);
            })
            .catch(error => {
                console.error(error)
            });
    }
}
