run();

async function run() {
    const {db, user, settings} = await require('../db');

    let tileBank;
    try {
        tileBank = db.collection('tileBank');
        await tileBank.deleteMany({})
        mongoInsert();
    } catch (error) {
        tileBank = db.createCollection('tileBank');
        mongoInsert();
    }

    async function mongoInsert() {
        let tileBanks = [];
        const users = await user.find().toArray();
        users.forEach(u => {
            if(!u.tileBank) return;

            let newTileBank = {
                bank: u.tileBank,
                ownerKey: u._id
            };



            tileBanks.push(newTileBank);
        });

        await tileBank.insertMany(tileBanks);
        await user.updateMany({},{$unset: {"tileBank": ""}});

        const allSettings = await settings.find().toArray();
        const allTileBanks = await tileBank.find().toArray();
        let allTileBanksDict = {}

        allTileBanks.forEach(tb => {
            allTileBanksDict[tb.ownerKey] = tb;
        })

        console.log('set default tile bank')
        for(let i = 0; i < allSettings.length; i++) {
            let currSettings = allSettings[i];
            let tb = allTileBanksDict[currSettings.ownerKey];
            if(tb) {
                await settings.updateOne({_id: currSettings._id}, {$set: {tileBankId: tb._id}});
            }
        }

        console.log("tile banks created successfully!");
        process.exit(0);
    }
}
