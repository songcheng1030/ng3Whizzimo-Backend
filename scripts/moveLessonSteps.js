const _ = require('lodash');
run();

async function run() {
    const {db, lessonPlan, courseWorkbook, workbook, activityType, course} = await require('../db');

    let lessonPlanStep;
    try {
        lessonPlanStep = db.collection('lessonPlanStep');
        await lessonPlanStep.deleteMany({});
        mongoInsert();
    } catch (error) {
        lessonPlanStep = db.createCollection('lessonPlanStep');
        mongoInsert();
    }

    async function mongoInsert() {
        console.log('get lesson plans')
        const result = await lessonPlan.find().toArray();
        if(!result || result.length === 0) {
            return console.error('No Lesson Plans Found');
        }

        console.log('get activity types')
        const activityTypes = await activityType.find().toArray();

        const newLessonPlanSteps = [];
        console.log('get workbooks')
        const workbooks = await workbook.find({}, {oldId:1}).toArray();
        let workbooksDictionary = {};
        workbooks.forEach(wkbk => {
            workbooksDictionary[wkbk.oldId] = wkbk;
        })
        console.log('get course workbooks')
        const courseWorkbooks = await courseWorkbook.find().toArray();
        let courseWorkbookDictionary = {};
        courseWorkbooks.forEach(cwkbk => {
            courseWorkbookDictionary[`${cwkbk.courseId}-${cwkbk.oldWorkbookId}`] = cwkbk;
        })

        console.log('get courses')
        const courses = await course.find().toArray();
        let coursesOrigKeyDict = _.groupBy(courses.filter(course => course.origCourseKey), c => c.origCourseKey);

        console.log('create lesson plan steps')
        for(let i = 0; i < result.length; i++) {
            const lesson = result[i];

            if(lesson.firebaseid === "-MP-iV8TwMj5OofRMN9l") {
                let test = '';
            }

            if(!lesson.lessons) {
                continue;
            }



            for (let j = 0; j < lesson.lessons.length; j++) {
                const step = lesson.lessons[j];
                const wb = workbooksDictionary[step.workbook];
                if(!wb) continue;
                const cw = courseWorkbookDictionary[`${lesson.courseId}-${step.workbook}`];
                let activityType = activityTypes.find(activityType => {
                    return activityType.name === step.activityName
                    || (activityType.name === 'Mini Tile Board' && step.activityName === 'Mini Tiles');
                });
                if (cw && activityType) {
                    if(lesson.firebaseid === "-MQtpfy1ZerQekuWnRgf") {
                        let test = ""
                    }
                    let tiles;
                    if ((Array.isArray(step.tiles) || !step.tiles)) {
                        tiles = step.tiles;
                    } else {
                        tiles = Object.values(step.tiles);
                    }

                    if(step.letterTiles) {
                        if (Array.isArray(step.letterTiles)) {
                            tiles = step.letterTiles;
                        } else {
                            tiles = Object.values(step.letterTiles);
                        }
                    }

                    let blankTiles;
                    if (step.colors) {
                        blankTiles = Object.values(step.colors).map(color => `tiles.blank.${color.name}`);
                    }

                    let selectedView;
                    if(step.selectedView) {
                        switch (step.selectedView) {
                            case "1":
                            case 1:
                                selectedView = 'Onset/Rime';
                                break;
                            case "2":
                            case 2:
                                selectedView = 'Syllables';
                                break;
                            case "3":
                            case 3:
                                selectedView = 'Tiles';
                                break;
                            default:
                                selectedView = 'Word';
                        }
                    }

                    let newLessonPlanStep = {
                        order: j,
                        activity: step.activity,
                        activityName: step.activityName,
                        activityId: activityType._id,
                        lined: step.lined,
                        name: step.name,
                        numWords: step.numWords,
                        tiles,
                        blankTiles,
                        miniTiles: (Array.isArray(step.miniTiles) || !step.miniTiles) ? step.miniTiles : Object.values(step.miniTiles),
                        words: (Array.isArray(step.words) || !step.words) ? step.words : Object.values(step.words),
                        courseWorkbookId: cw._id,
                        courseId: cw.courseId,
                        workbookId: cw.workbookId,
                        lessonPlanId: lesson.firebaseid,
                        ownerKey: cw.ownerKey,
                        ignoreWhizzimap: step.ignoreWhizzimap,
                        selectedView
                    };

                    newLessonPlanStep = updateNewStep(newLessonPlanStep, activityTypes, step);
                    newLessonPlanSteps.push(newLessonPlanStep);
                }
            }
        }

        console.log('insert lesson plan steps')
        try {
            await lessonPlanStep.insertMany(newLessonPlanSteps);
            console.log("New lessonPlanSteps collection created successfully!");
            process.exit(0);

        } catch(error) {
            console.log(error);
            process.exit(1);
        }
    }
}

function removeAttributes(obj) {
    return obj.map(item => {
        if(item.attributes) {
            item = {...item, ...item.attributes};
            delete item.attributes;
        }

        return item;
    })
}

function updateNewStep(newLessonPlanStep, activityTypes, step) {
    const blackboardActivity = activityTypes.find(at => at.name.toLowerCase().indexOf('blackboard') >= 0);

    if(newLessonPlanStep.activityId === blackboardActivity._id) {
        newLessonPlanStep.numWords = 0;
    }

    if (step.passages) {
        newLessonPlanStep.passages = Array.isArray(step.passages) ? step.passages : Object.values(step.passages);
        newLessonPlanStep.passages = removeAttributes(newLessonPlanStep.passages);
    }
    if (step.phrases) {
        newLessonPlanStep.phrases = Array.isArray(step.phrases) ? step.phrases : Object.values(step.phrases);
        newLessonPlanStep.phrases = removeAttributes(newLessonPlanStep.phrases);
    }
    if (step.sentences) {
        newLessonPlanStep.sentences = Array.isArray(step.passages) ? step.passages : Object.values(step.sentences);
        newLessonPlanStep.sentences = removeAttributes(newLessonPlanStep.sentences);
    }
    if (step.files) {
        newLessonPlanStep.files = Array.isArray(step.files) ? step.files : Object.values(step.files);
        newLessonPlanStep.files = removeAttributes(newLessonPlanStep.files);
        newLessonPlanStep.files = newLessonPlanStep.files.map(file => {
            file._id = file.id;
            delete file.id;
            return file;
        });
    }

    return newLessonPlanStep;
}
