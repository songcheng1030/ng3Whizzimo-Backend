const path = require('path');
require('dotenv').config({path: path.join(__dirname,'.env')});
console.log('PATH: ' + path.join(__dirname,'.env'))
// const connString = process.env.MONGODB_URI;
const connString = "mongodb+srv://esmallwood:nanjing1@whizzimotest.qis8f.mongodb.net/whizzimoprod?retryWrites=true&w=majority";

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = connString;

// Database Name
const dbName = process.env.MONGO_DB_NAME;

let db;
let user
let course;
let courses;
let accIndex;
let wordlist;
let workbook;
let courseWorkbook;
let words;
let grapheme;
let phoneme;
let sentence;
let sentences;
let sentenceOwners;
let phrase;
let phrases;
let phraseOwners;
let passage;
let passages;
let passageOwners;
let workbookSentence;
let workbookPhrase;
let workbookPassage;
let files;
let workbookFile;
let lessonPlan;
let lessonPlans;
let lessonPlanSteps;
let student;
let userSettings;
let settings;
let tileBank;
let stripePlan;
let bundle;
let bundleQueue;
let bundleContent;
let activityType;
let courseWorkbookActivity;
let subscription;


module.exports = (async function() {
  async function init() {
    return new Promise((resolve, reject) => {
      console.log(url);
      MongoClient.connect(url, function(err, client) {
        if (err) {
          return reject(err);
        }
        assert.equal(null, err);
        console.log("Connected successfully to server");

        resolve(client.db(dbName));
      });
    });
  }

  db = await init();
  user = db.collection('user');
  course = db.collection('course');
  courses = db.collection('courses');
  accIndex = db.collection('accIndex');
  wordlist = db.collection('wordlist');
  workbook = db.collection('workbook');
  courseWorkbook = db.collection('newCourseWorkbook');
  courseWorkbookActivity = db.collection('courseWorkbookActivity');
  words = db.collection('WordData_20170520212634');
  grapheme = db.collection('grapheme');
  phoneme = db.collection('phoneme');
  sentence = db.collection('sentence');
  sentences= db.collection('sentences');
  sentenceOwners = db.collection('sentenceOwners');
  phrase = db.collection('phrase');
  phrases = db.collection('phrases');
  phraseOwners = db.collection('phraseOwners');
  passage = db.collection('passage');
  passages = db.collection('passages');
  passageOwners = db.collection('passageOwners');
  workbookSentence = db.collection('workbookSentence');
  workbookPhrase = db.collection('workbookPhrase');
  workbookPassage = db.collection('workbookPassage');
  files = db.collection('files');
  workbookFile = db.collection('workbookFile');
  lessonPlan = db.collection('lessonPlan');
  lessonPlans = db.collection('lessonPlans');
  lessonPlanSteps = db.collection('lessonPlanStep');
  student = db.collection('student');
  userSettings = db.collection('userSettings');
  settings = db.collection('settings');
  tileBank = db.collection('tileBank');
  stripePlan = db.collection('stripePlan');
  bundle = db.collection('bundle');
  bundleQueue = db.collection('bundleQueue');
  bundleContent = db.collection('bundleContent');
  activityType = db.collection('activityType');
  subscription = db.collection('subscription');

  return {
    db,
    user,
    course,
    courses,
    accIndex,
    wordlist,
    workbook,
    courseWorkbook,
    words,
    grapheme,
    phoneme,
    sentence,
    sentenceOwners,
    phrase,
    phraseOwners,
    passage,
    passageOwners,
    sentences,
    workbookSentence,
    phrases,
    workbookPhrase,
    passages,
    workbookPassage,
    files,
    workbookFile,
    lessonPlan,
    lessonPlans,
    lessonPlanSteps,
    student,
    userSettings,
    tileBank,
    settings,
    stripePlan,
    subscription,
    bundle,
    bundleQueue,
    bundleContent,
    activityType,
    courseWorkbookActivity
  }
})();


