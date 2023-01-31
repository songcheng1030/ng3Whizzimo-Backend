const {DefaultSettings} = require("../app/constants/DefaultSettings");

run();

async function run() {
    const {settings} = await require('../db');

    await settings.updateMany({}, {$set: {'tiles.consle': DefaultSettings.tiles.consle}})
    console.log("settings updated successfully!");
    process.exit(0);
}

