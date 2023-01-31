run();

async function run() {
    const {db, phraseOwners, workbook, phrases} = await require('../db');

    let workbookPhrase;
    try {
        workbookPhrase = db.collection('workbookPhrase');
        await workbookPhrase.deleteMany({})
        mongoInsert();
    } catch (error) {
        workbookPhrase = db.createCollection('workbookPhrase');
        mongoInsert();
    }

    async function mongoInsert() {
        const result = await phraseOwners.find().toArray();

        const phrasesDb = await phrases.find({}, {_id: 1, oldId: 1}).toArray();

        const phrasesDict = {};

        phrasesDb.forEach(s => {
            phrasesDict[s.oldId] = s._id;
        });

        if(!result || result.length === 0) {
            console.log("Workbook phrases created successfully!");
            process.exit(0);
        }

        let wbs = await workbook.find().toArray();
        const workbookDictionary = {};
        wbs.forEach(wb => {
            workbookDictionary[wb.oldId] = wb;
        })

        const workbookPhrases = [];
        const workbookPhraseDict = {}

        for(let i = 0; i < result.length; i++) {
            const p = result[i];
            for(let j = 0; j < p.workbookKeys.length; j++) {
                const key = p.workbookKeys[j];
                const wb = workbookDictionary[key];
                if(wb){
                    const id = phrasesDict[p.phraseId]

                    if(!workbookPhraseDict[`${id}-${wb._id}`]) {
                        workbookPhraseDict[`${id}-${wb._id}`] = 1;
                        workbookPhrases.push({phraseId: id, workbookId: wb._id});
                    }
                }
            }
        }

        await workbookPhrase.insertMany(workbookPhrases);

        console.log("Workbook Phrases created successfully!");
        process.exit(0);
    }

}
