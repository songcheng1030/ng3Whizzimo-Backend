run();

async function run() {
    const {db} = await require('../db');

    let sentences;
    let sentenceOwners = db.collection('sentenceOwners');
    try {
        sentences = db.collection('sentences');

        sentences.deleteMany({})
            .then(() => {
                mongoInsert();
            })
            .catch(error => {
                console.log(error);
                process.exit(1);
            });
    } catch (error) {
        sentences = db.create('sentences');
        mongoInsert();
    }

    async function mongoInsert() {
        let insertRequests = [];

        const result = await sentenceOwners.aggregate(
            [
                { $lookup: {from: "sentence", localField: "sentenceId", foreignField: "_id", as: "sentence" } },
                { $unwind: "$sentence"},
            ]
        ).toArray();

        if(!result || result.length === 0) {
            return console.error('No Sentences Found');
        }

        const newSentences = [];

        result.forEach(s => {
            let newSentence = {
                oldId: s.sentence._id,
                sentence: s.sentence.sentence,
                ownerKey: s.ownerKey
            };

            newSentences.push(newSentence);
        });

        await sentences.insertMany(newSentences);

        console.log("New sentence collection created successfully!");
        process.exit(0);
    }
}
