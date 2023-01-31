
run();
async function run() {
    const {activityType, courseWorkbookActivity, lessonPlanSteps} = await require('../db');

        const activityTypes = await activityType.find({}, {name: 1}).toArray();

        let activityTypesDictionary = {};
        activityTypes.forEach(at => {
            activityTypesDictionary[at._id] = at;
        })

        const activityTypesNewIds = [
            {
                _id: "blackboard",
                name: "Blackboard",
                desc: "Fully customizable digital letter tiles that stay organized and never get lost.",
                order: 0,
                url: '//activity/blackboard/'
            },
            {
                _id: "workbookTiles",
                name: "Workbook Tiles",
                desc: "Shows only the tiles in that workbook.",
                order: 1,
                url: '//activity/workbook-tiles/'
            },
            {
                _id: "miniTiles",
                name: "Mini Tile Board",
                desc: "Show just a few tiles at a time to focus on a specific concept.",
                order: 13,
                url: '//activity/mini-tiles/'
            },
            {
                _id: "wordcards",
                name: "Wordcards",
                desc: "Practice concepts with movable wordcards that can be rearranged as you please.",
                order: 2,
                url: '//activity/wordcards/'
            },
            {
                _id: "timedReading",
                name: "Timed Reading",
                desc: "Assessment for reading fluency and accuracy.",
                order: 3,
                url: '//activity/timed-reading/'
            },
            {
                _id: "flashcards",
                name: "Flashcards",
                desc: "Show the whole word, syllable breakdown, and more using dynamic flashcards.",
                order: 4,
                url: '//activity/flashcards/'
            },
            {
                _id: "lettercards",
                name: "Lettercards",
                desc: "View the letter tiles for a workbook one at a time.",
                order: 5,
                url: '//activity/lettercards/'
            },
            {
                _id: "sentenceParts",
                name: "Sentence Parts",
                desc: "View sentence parts attached to this workbook.",
                order: 8,
                url: '//activity/phrases/'
            },
            {
                _id: "sentences",
                name: "Sentences",
                desc: "View sentences attached to this workbook.",
                order: 9,
                url: '//activity/sentences/'
            },
            {
                _id: "passages",
                name: "Passages",
                desc: "Display passages attached to this workbook.",
                order: 10,
                url: '//activity/passages/'
            },
            {
                _id: "spelling",
                name: "Spelling",
                desc: "(REAL WORDS ONLY) Spell words using letter tiles and receive a percent correct score.",
                order: 6,
                url: '//activity/spelling/'
            },
            {
                _id: "whiteboard",
                name: "Whiteboard",
                desc: "A blank page for writing, drawing, and typing.",
                order: 11,
                url: '//activity/whiteboard/'
            },
            {
                _id: "blankTiles",
                name: "Blank Tiles",
                desc: "Moveable blank tiles for practicing phonemic awareness.",
                order: 12,
                url: '//activity/blank-tiles/'
            },
            {
                _id: "pdfViewer",
                name: "PDF Viewer",
                desc: "View PDFs attached to this workbook.",
                order: 7,
                url: '//activity/pdf-viewer/'
            }
        ];

        let newActivityTypesDictionary = {}
        activityTypesNewIds.forEach(at => {
            newActivityTypesDictionary[at.name] = at;
        })

        for(let i = 0; i < activityTypes.length; i++) {
            const at = activityTypes[i];
            const newActivityTypeId = newActivityTypesDictionary[at.name]._id

            await courseWorkbookActivity.updateMany({activityTypeId: at._id}, {$set: {activityTypeId: newActivityTypeId}});
            await lessonPlanSteps.updateMany({activityName: at.name}, {$set: {activityId: newActivityTypeId}});
        }

        console.log('complete')
        process.exit(0);
}



