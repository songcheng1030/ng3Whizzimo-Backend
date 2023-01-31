run()

async function run() {
    const {db} = await require('../db');

    let security;

    try {
        security = db.collection('security');
        security.deleteMany({})
            .then(() => {
                console.log('security db created successfully');
                process.exit(0);
            })
            .catch(error => {
                console.log(error);
                process.exit(1);
            });
    } catch (error) {
        security = db.createCollection('security');
        console.log('security db created successfully');
        process.exit(0);
    }

}


