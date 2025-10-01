const mongoose = require('mongoose');

const MONGO_URI ='mongodb://127.0.0.1:27017/FileSharingDev'||process.env.MONGO_URI;

const DBconnection = () => {
        return mongoose.connect(MONGO_URI,{
            maxPoolSize:10
        }).catch (e => {
        console.log(`[LOG][ERROR] Couldn't connect to Database: ${e.message}`);
    });

}

module.exports = DBconnection;