const mongoose = require('mongoose');
const Links= require('../models/Links');

// config/db.js

 const MONGO_URI =  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/FileSharingDev';
const DBconnection = () => {
        return mongoose.connect(MONGO_URI,{
            maxPoolSize:10
        }).then(async () => {
            await Links.syncIndexes();
            console.log("Hurrah");
        }).catch (e => {
        console.log(`[LOG][ERROR] Couldn't connect to Database: ${e.message}`);
    });

}

module.exports = DBconnection;