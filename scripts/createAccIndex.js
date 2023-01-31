run()
async function run () {
  const {db} = await require('../db');
  let accIndex;
  try {
    accIndex = db.collection('accIndex');
    accIndex.deleteMany({})
        .then(() => {
          findNext(1);
        });
  } catch(error) {
    console.log(error);
    accIndex =  db.createCollection('accIndex');
    findNext(1);
  }

  function findNext(id) {
    accIndex
        .insertOne({accIndex: 50000})
        .then(result => process.exit(0));
  }
}

