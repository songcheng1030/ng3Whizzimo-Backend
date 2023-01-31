run();

async function run() {
  const {db} = await require('./../db');
  const firebaseUsers = require('./users.json');
  let user;
  try {
    user = db.collection('user');
    user.deleteMany({})
        .then(() => {
          mongoInsert();
        })
        .catch(error => {
          console.log(error);
          process.exit(1);
        });
  } catch (error) {
    user = db.createCollection('user');
    mongoInsert();
  }

  async function mongoInsert() {
    let insertRequests = [];
    let currentUser;
    const users = Object.keys(firebaseUsers).map(userId => {
      if(!userId || userId === '.priority') return;

      currentUser = firebaseUsers[userId];
      currentUser._id = userId;

      delete currentUser.workbookList;
      delete currentUser[".priority"];
      delete currentUser.lessonplans;
      delete currentUser.wordlists;
      delete currentUser.students;
      delete currentUser.sharedStudents;

      return currentUser;
    }).filter(user => typeof user !== 'undefined' && user);

    try {
      await user.insertMany(users);
      console.log("firebase courses imported successfully!");
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }


  }
}
