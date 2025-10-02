//Environment Variables
require('dotenv').config({path: require('path').resolve(__dirname,'../file_share_api_config.env')});
const PORT = parseInt(process.env.PORT,10) || 10000;

//Imports
const express = require('express');
const db_connection = require('./config/db');
const testRoute = require('./routes/testdb');
const fileRoute = require('./routes/files');
const userRoute = require('./routes/user');
const linkRoute = require('./routes/links');

BigInt.prototype.toJSON = function () {
  return this.toString();
};

//api
const app = express();
app.use(express.json());
app.use("/test", testRoute);
app.use("/file", fileRoute);
app.use("/user",userRoute);
app.use('/links',linkRoute);


//DB Connection Starting
db_connection().then(() => {
    console.log(`[LOG] Database connection started`)
    app.listen(PORT,() => {
    console.log(`[LOG] Started API on ${PORT}`);
    })  
}).catch(error => {
    console.log(`[LOG] Error ${error.message}`);
    process.exit(1);
});






