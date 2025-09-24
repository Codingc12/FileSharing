const express = require('express');
const upload = require('../upload');
const {fileUpload} = require('../controllers/files');

const route = express.Router();

//TODO: Create Authentication Middleware
//
route.post("/upload/file",upload.single('file'),(request,response) => fileUpload(request,response));

module.exports = route;