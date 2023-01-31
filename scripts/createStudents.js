run();

async function run() {
    console.log('loading users')
    const firebaseUsers = require("./users.json");
    console.log('loading complete')
    const {db, user} = await require('../db');

    let student;
    try {
        student = db.collection('student');
        await student.deleteMany({})
        mongoInsert();
    } catch (error) {
        student = db.createCollection('student');
        mongoInsert();
    }

    async function mongoInsert() {
        let students = [];
        Object.keys(firebaseUsers)
            .forEach(userKey => {
                var user = firebaseUsers[userKey];
                if(user && user.meta && user.meta.associatedStudents) {
                    Object.keys(user.meta.associatedStudents).forEach(associatedStudentKey => {
                        if(user.meta.associatedStudents[associatedStudentKey] && userKey !== '.priority') {
                            const associatedStudent = user.meta.associatedStudents[associatedStudentKey];
                            students.push({teacherId: userKey, userEmail: associatedStudent.username.trim() + '@whizzimo.com'});
                        }
                    });
                }
            });

        await student.insertMany(students);

        // update student with student id
        let updatedStudents = [];
        students = await student.find().toArray();
        for(let s of students) {
            let firebaseStudentKey = Object.keys(firebaseUsers).find(userKey => {
                return userKey !== '.priority' && firebaseUsers[userKey].meta && s.userEmail && firebaseUsers[userKey].meta.email === s.userEmail
            });
            if(firebaseStudentKey) {
                await student.updateOne({userEmail: firebaseUsers[firebaseStudentKey].meta.email}, {$set: {userId: firebaseStudentKey}, $unset: {userEmail: ""}});
            }
        }

        await user.updateMany({},{$unset: {"meta.associatedStudents": ""}});
        console.log("firebase courses imported successfully!");
        process.exit(0);
    }

}
