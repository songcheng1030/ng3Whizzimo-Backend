run();

async function run() {
    const {settings} = await require('../db');
    await settings.updateMany({themeHighlightColor: {$exists: false}}, {$set: {themeHighlightColor: 'theme1'}});
    await settings.updateMany({fontSize: {$exists: false}}, {$set: {fontSize: 40}});

    console.log("default themee updated successfully!");
    process.exit(0);
}
