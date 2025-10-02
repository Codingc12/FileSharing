const express = require('express');
const upload = require('../upload');
const {fileUpload,fileDownload, fileDownloadAdmin} = require('../controllers/files');
const isAuth = require('../Middleware/authentication')

const route = express.Router();

//TODO: Create Authentication Middleware
//
route.post("/upload/file",[isAuth, upload.single('file')],(request,response) => fileUpload(request,response));
route.get('/download/file/:id',[isAuth],(request,response) => fileDownloadAdmin(request,response));
route.get('/download/file/',[isAuth],(request, response) => fileDownload(request, response));
module.exports = route;