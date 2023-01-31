
run();

async function run() {
  const {db, user} = await require('../db');
  const {DefaultActivitySettings} = require('../app/constants/DefaultUserActivitySettings')
  const {DefaultUserSettings} = require('../app/constants/DefaultUserSettings')

  let userSettings;
  try {
    userSettings = db.collection('userSettings');
    await userSettings.deleteMany({})
    mongoInsert();
  } catch (error) {
    userSettings = db.createCollection('userSettings');
    mongoInsert();
  }

  async function mongoInsert() {
    let userActivitySettings = {...{},...DefaultActivitySettings}
    let users = await user.find().toArray();
    users = users.map(u => {
      if (!u.userSettings) return;

      u.userSettings.ownerKey = u._id;
      if (u.userSettings.blackboard) {
        userActivitySettings.blackboard.tileBank = u.userSettings.blackboard.tileBank;
      }

      u.userSettings.workbookLimit = u.userSettings.wordlists
          ? u.userSettings.wordlists.limit
          : DefaultUserSettings.workbookLimit;

      u.userSettings.courseLimit = u.userSettings.students
          ? u.userSettings.students.limit
          : DefaultUserSettings.courseLimit;

      delete u.userSettings.wordlists;
      delete u.userSettings.students;

      const newSettings = {...u.userSettings, ...userActivitySettings};
      return newSettings;
    });

    await userSettings.insertMany(users.filter(user => user));

    await user.updateMany({},{$unset: {"userSettings": "", "userSettingsBackup": ""}});

    console.log("user settings created successfully!");
    process.exit(0);
  }
}
