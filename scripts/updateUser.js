run();

async function run() {
    const {db, user} = await require('../db');

    let updateRequests = [];
     const users = await user.find().toArray();
    for (let i = 0; i < users.length; i++) {
        let u = users[i];
        if(!u.meta) continue;
        let updatedUser = {...u, ...u.meta};

        await user.updateOne({_id: u._id}, {$set:updatedUser});
    }

    await user.updateMany({},{$unset: {"meta": ""}})
    console.log("user settings created successfully!");
    process.exit(0);
}
