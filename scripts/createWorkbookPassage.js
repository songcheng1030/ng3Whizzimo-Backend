run();

async function run() {
    const {db, passageOwners, workbook, passages} = await require('../db');

    let workbookPassage;
    try {
        workbookPassage = db.collection('workbookPassage');
        await workbookPassage.deleteMany({})
        mongoInsert();
    } catch (error) {
        workbookPassage = db.createCollection('workbookPassage');
        mongoInsert();
    }

    async function mongoInsert() {
        const result = await passageOwners.find().toArray();

        const passagesDb = await passages.find({}, {_id: 1, oldId: 1}).toArray();

        const passagesDict = {};

        passagesDb.forEach(s => {
            passagesDict[s.oldId] = s._id;
        });

        if(!result || result.length === 0) {
            console.log("Workbook Passages created successfully!");
            process.exit(0);
        }

        const wbs = await workbook.find().toArray();
        const workbookDictionary = {};
        wbs.forEach(wb => {
            workbookDictionary[wb.oldId] = wb;
        });

        const workbookPassages = [];
        const workbookPassagesDict = {};

        for(let i = 0; i < result.length; i++) {
            const p = result[i];
            for(let j = 0; j < p.workbookKeys.length; j++) {
                const key = p.workbookKeys[j];
                const wb = workbookDictionary[key];
                if(wb){
                    const id = passagesDict[p.passageId]

                    if(wb._id === "eS9IaQF6SA") {
                        let test = ''
                    }

                    if(!workbookPassagesDict[`${id}-${wb._id}`]) {
                        workbookPassagesDict[`${id}-${wb._id}`] = 1;
                        workbookPassages.push({passageId: id, workbookId: wb._id, order: j});
                    }
                }
            }
        }

        await workbookPassage.insertMany(workbookPassages);

        console.log("Workbook Passages created successfully!");
        process.exit(0);
    }
}
