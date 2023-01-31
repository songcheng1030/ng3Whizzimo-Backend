const connString = "mongodb+srv://esmallwood:nanjing1@whizzimotest.qis8f.mongodb.net/whizzimoprod?retryWrites=true&w=majority";

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = connString;

module.exports = (async function() {
    async function init() {
      return new Promise((resolve, reject) => {
        console.log(url);
        MongoClient.connect(url, function(err, client) {
          if (err) {
            return reject(err);
          }
          assert.equal(null, err);
          console.log("Connected successfully to server");
  
          resolve(client.db('whizzimoprod'));
        });
      });
    }
  
    let db = await init();
    let courseWorkbooks = db.collection('newCourseWorkbooks');
    await courseWorkbooks.aggregate([{
        '$lookup': {
            from: 'WordData',
            localField: 'workbook.preview.wordid',
            foreignField: 'wordid',
            as: 'fullWords'
        }
    }, {
        '$merge': {
            into: 'newCourseWorkbook',
            on: '_id',
            whenMatched: 'merge',
            whenNotMatched: 'insert'
        }
    }])
    // .then((results) => {
    //     console.log('Aggregation Complete', results)
    // })
    console.log('course workbook aggregation complete!')
    process.exit(0)
  })();
  