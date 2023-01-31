const _ = require('lodash');
run();

async function run() {
  const {courses, db, activityType, workbook} = await require('../db');
  let courseWorkbook;
  let courseWorkbookActivity;
  try {
    courseWorkbook = db.collection('courseWorkbooks');
    courseWorkbook.deleteMany({})
    courseWorkbookActivity = db.collection('courseWorkbookActivity')
    courseWorkbookActivity.deleteMany({})
    moveSns(courseWorkbook);

  } catch (error) {
    console.log(error);
    courseWorkbook = db.createCollection('courseWorkbooks');
    courseWorkbookActivity = db.createCollection('courseWorkbookActivity');
    moveSns(courseWorkbook);
  }

  async function moveSns() {
    console.log('loading courses');
    let result = await courses.find().toArray();
    console.log('courses loaded');

    const courseWorkbookActivities = [];
    let newCourseWorkbooks = [];
    const activityTypes = await activityType.find().toArray();
    let matchedWorkbooks = [];
    let $or = [];
    let oldIdCourseDictionary = {};
    for (let i = 0; i < result.length; i++) {
      const c = result[i];
      if (c.scopeandsequence && Object.keys(c.scopeandsequence).length > 0) {
        // get all workbooks
        for (const snsKey of Object.keys(c.scopeandsequence)) {
          let sns = c.scopeandsequence[snsKey];
          $or.push({oldId: sns.wordlistKey});
          oldIdCourseDictionary[sns.wordlistKey] = c;
        }
      }
    }
    console.log('loading workbooks');
    matchedWorkbooks = await workbook.find().toArray();
    console.log('workbooks loaded');

    const oldIdWorkbookDictionary = {};

    //add courses to workbooks for lookup
    matchedWorkbooks.forEach(mappedWkbk => {
      mappedWkbk.course = oldIdCourseDictionary[mappedWkbk.oldId];
      oldIdWorkbookDictionary[mappedWkbk.oldId] = mappedWkbk;
    });
    console.log('creating new course workbooks')
    for(let i = 0; i < result.length; i++) {
      const c = result[i];
      if (c.scopeandsequence && Object.keys(c.scopeandsequence).length > 0) {
        for (const snsKey of Object.keys(c.scopeandsequence)) {
          let sns = c.scopeandsequence[snsKey];
          const matchedWorkbook = oldIdWorkbookDictionary[sns.wordlistKey];

          if (!matchedWorkbook) continue;

          sns.courseId = c._id;
          sns.oldId = snsKey;
          sns.ownerKey = c.teacherKey;
          sns.workbookId = matchedWorkbook._id;
          sns.oldWorkbookId = sns.wordlistKey;

          delete sns.name;
          delete sns.nonsense;
          delete sns.passages;
          delete sns.phonetic;
          delete sns.phrases;
          delete sns.real;
          delete sns.sentences;
          delete sns.files;
          delete sns.wordlistKey;

          newCourseWorkbooks.push(sns);
        }
      }

    }

    // find and remove duplicates
    const finalCourseWorkbooksList = [];
    const GroupedSNS = Object.values(_.groupBy(newCourseWorkbooks, (s) => `${s.courseId},${s.workbookId}`))
    const GroupedSNSCopy = GroupedSNS.slice()
    for(let i = 0; i < GroupedSNSCopy.length; i++) {
      let group = GroupedSNSCopy[i];
      if (group.length === 1) {
        finalCourseWorkbooksList.push(group[0]);
        continue;
      }

      let k = 0;
      for(let j = 0; j < group.length; j++) {
        if(
            GroupedSNS[i][j].wtWords
            || GroupedSNS[i][j].worksheetWords
            || GroupedSNS[i][j].timedReadingWords
            || GroupedSNS[i][j].flashcardWords
            || GroupedSNS[i][j].spellingWords
        ) {
          k = j;
          break;
        }
      }

      finalCourseWorkbooksList.push(group[k]);
    }


    console.log('inserting new course workbooks');
    await courseWorkbook.insertMany(finalCourseWorkbooksList);
    console.log('insert successful');
    console.log('fetching all courseworkbooks');
    newCourseWorkbooks = await courseWorkbook.find().toArray();
    console.log('course workbooks fetched');
    console.log('creating course workbook activities');
    for (let i = 0; i < newCourseWorkbooks.length; i++) {
      const newCourseWorkbook = newCourseWorkbooks[i];
      const matchedWorkbook = oldIdWorkbookDictionary[newCourseWorkbook.oldWorkbookId];

      if(!matchedWorkbook) continue;

      if (newCourseWorkbook.wtWords) {
        courseWorkbookActivities.push({
          courseWorkbookId: newCourseWorkbook._id,
          workbookId: matchedWorkbook._id,
          words: Array.isArray(newCourseWorkbook.wtWords) ? newCourseWorkbook.wtWords : Object.values(newCourseWorkbook.wtWords),
          numWords: newCourseWorkbook.wtNumWords || 30,
          tiles: matchedWorkbook.tiles,
          activityTypeId: activityTypes.find(activityType => activityType.name === "Workbook Tiles")._id
        });
      }

      if (newCourseWorkbook.worksheetWords) {
        courseWorkbookActivities.push({
          courseWorkbookId: newCourseWorkbook._id,
          workbookId: matchedWorkbook._id,
          words: Array.isArray(newCourseWorkbook.worksheetWords) ? newCourseWorkbook.worksheetWords : Object.values(newCourseWorkbook.worksheetWords),
          numWords: newCourseWorkbook.worksheetNumWords || 30,
          activityTypeId: activityTypes.find(activityType => activityType.name === "Wordcards")._id
        });
      }

      if (newCourseWorkbook.timedReadingWords) {
        courseWorkbookActivities.push({
          courseWorkbookId: newCourseWorkbook._id,
          workbookId: matchedWorkbook._id,
          words: Array.isArray(newCourseWorkbook.timedReadingWords) ? newCourseWorkbook.timedReadingWords : Object.values(newCourseWorkbook.timedReadingWords),
          numWords: newCourseWorkbook.timedReadingNumWords || 30,
          activityTypeId: activityTypes.find(activityType => activityType.name === "Timed Reading")._id
        });
      }

      if (newCourseWorkbook.flashcardWords) {
        courseWorkbookActivities.push({
          courseWorkbookId: newCourseWorkbook._id,
          workbookId: matchedWorkbook._id,
          words: Array.isArray(newCourseWorkbook.flashcardWords) ? newCourseWorkbook.flashcardWords : Object.values(newCourseWorkbook.flashcardWords),
          numWords: newCourseWorkbook.flashcardNumWords || 30,
          activityTypeId: activityTypes.find(activityType => activityType.name === "Flashcards")._id
        });
      }

      if (newCourseWorkbook.spellingWords) {
        courseWorkbookActivities.push({
          courseWorkbookId: newCourseWorkbook._id,
          workbookId: matchedWorkbook._id,
          words: Array.isArray(newCourseWorkbook.spellingWords) ? newCourseWorkbook.spellingWords : Object.values(newCourseWorkbook.spellingWords),
          numWords: newCourseWorkbook.spellingNumWords || 30,
          activityTypeId: activityTypes.find(activityType => activityType.name === "Spelling")._id
        });
      }

      if (matchedWorkbook.letterTiles) {
        courseWorkbookActivities.push({
          courseWorkbookId: newCourseWorkbook._id,
          workbookId: matchedWorkbook._id,
          tiles: matchedWorkbook.letterTiles,
          activityTypeId: activityTypes.find(activityType => activityType.name === "Lettercards")._id
        });
      }

      if (matchedWorkbook.miniTiles) {
        courseWorkbookActivities.push({
          courseWorkbookId: newCourseWorkbook._id,
          workbookId: matchedWorkbook._id,
          tiles: matchedWorkbook.miniTiles,
          words: !newCourseWorkbook.mtWords || Array.isArray(newCourseWorkbook.mtWords) ? newCourseWorkbook.mtWords : Object.values(newCourseWorkbook.mtWords),
          numWords: newCourseWorkbook.mtNumWords || 30,
          activityTypeId: activityTypes.find(activityType => activityType.name === "Mini Tile Board")._id
        });
      }

      courseWorkbookActivities.push({
        courseWorkbookId: newCourseWorkbook._id,
        workbookId: matchedWorkbook._id,
        words: [],
        numWords: 0,
        activityTypeId: activityTypes.find(activityType => activityType.name === "Blackboard")._id
      });
    }
    console.log('inserting course workbook activities');
    await courseWorkbookActivity.insertMany(courseWorkbookActivities);

    console.log("course workbooks and course workbook Activities created successfully successfully!");
    process.exit(0);

  }



}
