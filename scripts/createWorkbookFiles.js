run();

async function run() {
    const {db, files, workbook} = await require('../db');


    let workbookFile;
    try {
        workbookFile = db.collection('workbookFile');
        workbookFile.deleteMany({})
            .then(() => {
                mongoInsert();
            })
            .catch(error => {
                console.log(error);
                process.exit(1);
            });
    } catch (error) {
        workbookFile = db.createCollection('workbookFile');
        mongoInsert();
    }

    async function mongoInsert() {
        const result = await files.find().toArray();

        if(!result || result.length === 0) {
            console.log("Workbook Files created successfully!");
            process.exit(0);
        }

        const wbs = await workbook.find().toArray();
        const workbookDictionary = {};
        wbs.forEach(wb => {
            workbookDictionary[wb.oldId] = wb;
        });

        const workbookFiles = [];
        for(let i = 0; i < result.length; i++) {
            const f = result[i];
            for(let j = 0; j < f.workbookKeys.length; j++) {
                const key = f.workbookKeys[j];
                const wb = workbookDictionary[key];
                if(wb){
                    workbookFiles.push({fileId: f._id, workbookId: wb._id});
                }
            }
        }

        await workbookFile.insertMany(workbookFiles);

        console.log("Workbook Files created successfully!");
        process.exit(0);
    }
}
