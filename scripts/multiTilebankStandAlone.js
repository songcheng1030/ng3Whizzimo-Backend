run();

async function run() {
    const {db, user, settings, tileBank} = await require('../db');

    console.log('get all settings');
    const allSettings = await settings.find().toArray();
    console.log('get all tilebanks');
    const allTileBanks = await tileBank.find().toArray();
    let allTileBanksDict = {}

    allTileBanks.forEach(tb => {
        allTileBanksDict[tb.ownerKey] = tb;
    })

    console.log('set default tile bank id in settings')
    for(let i = 0; i < allSettings.length; i++) {
        let currSettings = allSettings[i];
        let tb = allTileBanksDict[currSettings.ownerKey];
        if(tb) {
            await settings.updateOne({_id: currSettings._id}, {$set: {bank: tb.bank}});
        }
    }

    console.log("tile banks updated successfully!");
    process.exit(0);
}
