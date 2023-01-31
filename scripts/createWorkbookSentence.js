run();

async function run() {
    const {db, sentenceOwners, workbook, sentences} = await require('../db');

    let workbookSentence;
    try {
        workbookSentence = db.collection('workbookSentence');
        workbookSentence.deleteMany({})
            .then(() => {
                mongoInsert();
            })
            .catch(error => {
                console.log(error);
                process.exit(1);
            });
    } catch (error) {
        workbookSentence = db.createCollection('workbookSentence');
        mongoInsert();
    }

    async function mongoInsert() {
        const owners = await sentenceOwners.find().toArray();

        const sentencesDb = await sentences.find({}, {_id: 1, oldId: 1}).toArray();

        const sentencesDict = {};

        sentencesDb.forEach(s => {
           sentencesDict[s.oldId] = s._id;
        });

        if(!owners || owners.length === 0) {
            console.log("Workbook Sentences created successfully!");
            db.close();
            process.exit(0);
        }

        let wbs = await workbook.find().toArray();
        const workbookDictionary = {};
        wbs.forEach(wb => {
            workbookDictionary[wb.oldId] = wb;
        });

        const workbookSentences = [];
        const workbookSentencesDict = {};
        for(let i = 0; i < owners.length; i++) {
            const owner = owners[i];
            for(let j = 0; j < owner.workbookKeys.length; j++) {
                const key = owner.workbookKeys[j];
                const wb = workbookDictionary[key];
                if(wb){
                    const id = sentencesDict[owner.sentenceId]
                    if(!workbookSentencesDict[`${id}-${wb._id}`]) {
                        workbookSentencesDict[`${id}-${wb._id}`] = 1;
                        workbookSentences.push({sentenceId: id, workbookId: wb._id, order: [j]});
                    }
                }
            }
        }

        await workbookSentence.insertMany(workbookSentences);

        console.log("Workbook Sentences created successfully!");
        process.exit(0);
    }
}
