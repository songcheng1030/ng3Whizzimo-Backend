run();

async function run() {
    const {lessonPlanSteps, files} = await require('../db');
    console.log("Load Lesson Plan Steps");
    const lps = await lessonPlanSteps.find({files: {$exists: true}}).toArray();
    console.log("Load Files");
    const f = await files.find().toArray();
    let filesDict = {};
    f.forEach(file => {
        filesDict[file._id] = file;
    });
    console.log("Update steps");
    for(let i = 0; i < lps.length; i++) {
        const lessonPlanStep = lps[i];
        if(!lessonPlanStep.files || lessonPlanStep.files.length === 0) continue;

        if(lessonPlanStep.lessonPlanId === "-MOhbnYqba8AsVyUAwih") {
            let test = '';
        }

        const fullFiles = lessonPlanStep.files.filter(file => file !== null).map(file => filesDict[file.id]).filter(file => typeof file !== 'undefined');

        await lessonPlanSteps.update({_id: lessonPlanStep._id}, {$set: {files: fullFiles}});

    }
    console.log('Lesson Plan Step Files Updated!');

    process.exit(0);
}
