run();

async function run() {

  const {db, subscription} = await require('./../db');
  const firebaseCourses = require('./students.json');
  const firebaseUsers = require('./users.json');
  const userIds = Object.keys(firebaseUsers);
  const subscriptions = [];
  await subscription.deleteMany();
  userIds.forEach(uid => {
    if(firebaseUsers[uid].sharedStudents) {
      Object.keys(firebaseUsers[uid].sharedStudents).forEach(sharedKey => {
        const courseId = firebaseUsers[uid].sharedStudents[sharedKey]
        subscriptions.push({userId: uid, courseId: courseId});
      });
    }
  });
  await subscription.insertMany(subscriptions);
  let courses;
  let course;
  try {
    courses = db.collection('courses');
    course = db.collection('course');
    await course.deleteMany();
    await courses.deleteMany({});
    mongoInsert();
  } catch (error) {
    courses = db.createCollection('courses');
    course = db.createCollection('course');
    mongoInsert();
  }

  async function mongoInsert() {
    let currentCourse;
    const newcourses = Object.keys(firebaseCourses).map(courseId => {
      currentCourse = firebaseCourses[courseId];
      currentCourse._id = courseId;
      currentCourse.courseName = currentCourse.firstname;
      const owner = firebaseUsers[currentCourse.teacherKey];
      currentCourse.order = owner && owner.students && owner.students[courseId] ? owner.students[courseId]['.priority'] : 0;

      if(currentCourse.order > 0) {
        let test = '';
      }

      if(courseId === '-KBPwOlVEUlSsrBFmRV9') {
        let test = '';
      }

      if(currentCourse.notes === 'This course covers common phonics concepts taught in an early or remedial literacy program.') {
        currentCourse.notes = '';
      }

      delete currentCourse.firstname;
      delete currentCourse[".priority"];

      if(currentCourse.shared) {
        currentCourse.sharedkey = courseId
      }

      return currentCourse;
    });

    await courses.insertMany(newcourses);
    await course.insertMany(newcourses);

    console.log("firebase courses imported successfully!");
    process.exit(0);
  }
}
