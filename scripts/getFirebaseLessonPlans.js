var admin = require("firebase");
var fs = require('fs');
var util = require('util');
var rs = require('randomstring');

var config = {
    apiKey: "AIzaSyB5bDEC79gFmKPjACMKQvNLwn5JFGJ7YT4",
    authDomain: "whizzimo-edu.firebaseapp.com",
    databaseURL: "https://whizzimo-edu.firebaseio.com",
};

const limit = 10000;

admin.initializeApp(config);

// Get a reference to the database service
const database = admin.database();

let lessonPlansList = {};

function getFirstKey() {
    const ref = database.ref(`WhizzimoAcademy/lessonplans`);

    return new Promise((resolve, reject) => {
        ref.orderByKey().limitToFirst(2).on('value', (snapshot) => {
            const lessonPlans = snapshot.exportVal();
            lessonPlansList = {...lessonPlansList, ...lessonPlans};

            resolve(Object.keys(lessonPlans).pop());
        });
    });
}

async function run() {
     const firstKey = await getFirstKey();
    importLessonPlans(firstKey);
}

run();

function importLessonPlans(startAt) {
    const ref = database.ref(`WhizzimoAcademy/lessonplans`);

    ref.orderByKey().startAt(startAt).limitToFirst(limit).once('value', (snapshot) => {
        const lessonPlans = snapshot.exportVal();

        const keys = Object.keys(lessonPlans);

        const dir = __dirname + `\\lessonplans-${rs.generate(6)}.json`;
        fs.writeFileSync(dir, JSON.stringify(lessonPlans));

        if(keys.length < limit) {
            console.log("firebase lesson plans imported successfully!");
            process.exit(0);
        } else {
            const lastKey = keys.pop();
            importLessonPlans(lastKey);
        }
    });
}


