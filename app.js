//Environment Variables
require('dotenv').config({path: require('path').resolve(__dirname,'../')});
const PORT = parseInt(process.env.PORT,10) || 10000;

//Imports
const express = require('express');
const db_connection = require('./config/db');
const testRoute = require('./routes/testdb');
const fileRoute = require('./routes/files');

BigInt.prototype.toJSON = function () {
  return this.toString();
};

//api
const app = express();
app.use("/test", testRoute);
app.use("/file", fileRoute);


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






