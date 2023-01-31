run();

async function run() {
    const {db, passageOwners} = await require('../db');

    let passages;
    try {
        passages = db.collection('passages');
        passages.deleteMany({})
            .then(() => {
                mongoInsert();
            })
            .catch(error => {
                console.log(error);
                process.exit(1);
            });
    } catch (error) {
        passages = db.createCollection('passages');
        mongoInsert();
    }

    async function mongoInsert() {
        let insertRequests = [];

        const result = await passageOwners
            .aggregate([
                    { $lookup: {from: "passage", localField: "passageId", foreignField: "_id", as: "passage" } },
                    { $unwind: "$passage"},
                ]
            ).toArray();

        if(!result || result.length === 0) {
            return console.error('No passages Found');
        }

        result.forEach(p => {
            let newPassage = {
                oldId: p.passage._id,
                passage: p.passage.passage,
                ownerKey: p.ownerKey
            };

            insertRequests.push(passages.insert(newPassage));
        });

        Promise.all(insertRequests)
            .then(() => {
                console.log("New passage collection created successfully!");
                process.exit(0);
            })
            .catch(error => {
                console.log(error);
                process.exit(1);
            });
    }
}
