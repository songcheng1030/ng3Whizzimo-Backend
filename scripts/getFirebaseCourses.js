var admin = require("firebase");
var fs = require('fs');

var config = {
    apiKey: "AIzaSyB5bDEC79gFmKPjACMKQvNLwn5JFGJ7YT4",
    authDomain: "whizzimo-edu.firebaseapp.com",
    databaseURL: "https://whizzimo-edu.firebaseio.com",
};

admin.initializeApp(config);

// Get a reference to the database service
const database = admin.database();
const ref = database.ref(`WhizzimoAcademy/students`);

ref.on('value', (snapshot) => {
    const users = snapshot.exportVal();
    const dir = __dirname + '\\students.json';
    fs.writeFileSync(dir, JSON.stringify(users));
});
