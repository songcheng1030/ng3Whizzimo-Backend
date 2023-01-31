run();

async function run() {
    const {course} = await require('../db');

    course
        .updateMany({}, {$unset: {scopeandsequence: ""}})
        .then(() => {
            console.log('Scope and sequence removed from course')
            process.exit(0);
        });
}
