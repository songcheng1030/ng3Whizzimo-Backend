const {DefaultTileBank} = require("../dist/app/constants/DefaultTileBank");

const {DefaultSettings} = require("../dist/app/constants/DefaultSettings");

run();

async function run() {
  const {db, user} = await require('../db');

  let settings;
  try {
    settings = db.collection('settings');
    await settings.deleteMany({})
    mongoInsert();
  } catch (error) {
    settings = db.createCollection('settings');
    mongoInsert();
  }

  async function mongoInsert() {
    let userSettings = [];
    const users = await user.find().toArray();
    users.forEach(u => {
        if (!u.userSettings) return;

        u.userSettings.ownerKey = u._id;

        let tileBankSettings;
        if (u.userSettings.blackboard) {
            tileBankSettings = u.userSettings.blackboard.tileBank;
            delete u.userSettings.blackboard.tileBank;
        }

        let newSettings = {...DefaultSettings, ...u.userSettings}

        let rearrangedCompoundSounds = {};
        Object.keys(DefaultSettings.compoundSounds).forEach(key => {
            if(u.userSettings.compoundSounds) {
                rearrangedCompoundSounds[key] = u.userSettings.compoundSounds[key];
            }
        });

        newSettings.compoundSounds = rearrangedCompoundSounds;
        newSettings.blackboard = DefaultSettings.blackboard;
        newSettings.blackboard.wordNum = 0
        newSettings.isCurrent = true;

        if (tileBankSettings) {
            newSettings.blackboard.tileBank = tileBankSettings;
        }

        newSettings.bank = u.tileBank || DefaultTileBank

        newSettings.tiles.consle = {
            tilebgcolor: 'c-yellow',
            tilefontcolor: 'fc-black'
        };

        newSettings.textfont = DefaultSettings.textfont;
        newSettings.tiles.initblend = newSettings.tiles.initblend || DefaultSettings.tiles.initblend;
        newSettings.tiles.endblend = newSettings.tiles.endblend || DefaultSettings.tiles.endblend;
        newSettings.tiles.blank = DefaultSettings.tiles.blank;

        userSettings.push(newSettings);
    });

    await settings.insertMany(userSettings);
    await user.updateMany({},{$unset: {"settings": "", "settingsBackup": ""}});
    console.log("settings created successfully!");
    process.exit(0);
  }

}

