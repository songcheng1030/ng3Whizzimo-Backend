run();

async function run() {
    const {db} = await require('../db');
    let wordlist = db.collection('wordlist');
    let workbook = db.collection('workbook');
    let newCourseWorkbookActivities;

    try {
        newCourseWorkbookActivities = db.collection('courseWorkbookActivity');
        await newCourseWorkbookActivities.deleteMany({})
        createCourseWorkbookActivities();
    } catch (error) {
        newCourseWorkbookActivities = db.createCollection('courseWorkbookActivity');
        createCourseWorkbookActivities()
    }

    async function createCourseWorkbookActivities() {
        const newWorkbooks = workbook.find().toArray();
        const newWorkbookDict = {};
        newWorkbooks.forEach(workbook =>{
            newWorkbooks[workbook.oldId] = workbook;
        });

        const oldWorkbooks = wordlist.find().toArray();
        let courseWorkbookActivities = [];
        oldWorkbooks.forEach(oldWorkbook => {

        });



    }
}
