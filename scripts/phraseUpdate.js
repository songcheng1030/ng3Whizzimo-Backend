run();

async function run () {
    const {db, phraseOwners} = await require('../db');

    let phrases;
    try {
        phrases = db.collection('phrases');
        await phrases.deleteMany({});
        mongoInsert();
    } catch (error) {
        phrases = db.createCollection('phrases');
        mongoInsert();
    }

    async function mongoInsert() {
        const result = await phraseOwners
            .aggregate([
                    { $lookup: {from: "phrase", localField: "phraseId", foreignField: "_id", as: "phrase" } },
                    { $unwind: "$phrase"},
                ]
            ).toArray();

        if(!result || result.length === 0) {
            return console.error('No phrases Found');
        }

        const newPhrases = [];

        result.forEach(p => {
            let newPhrase = {
                oldId: p.phrase._id,
                phrase: p.phrase.phrase,
                ownerKey: p.ownerKey
            };

            newPhrases.push(newPhrase);
        });

        await phrases.insertMany(newPhrases);

        console.log("New phrase collection created successfully!");
        process.exit(0);

    }
}
