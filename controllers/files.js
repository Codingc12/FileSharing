const File = require('../models/files');
const User = require('../models/User');
const multer = require('multer');
const upload = require('../upload');
const mongoose = require('mongoose');

const fileUpload = async (request, response) => {
    const data = request.file;

    console.log("File saved at folder:", data.destination);
    console.log("Full path to file:", data.path);

    const file = await File.create({
        filePath: data.path,
        size: data.size,
        Upload_user: new mongoose.Types.ObjectId("68d447613d6335fdc6eaae00"),
        fileName: data.filename,
        type: data.mimetype
    });

    response.status(200).json({
        "Message": "File Uploaded Successfully",
        "id": file.id
    });
};

module.exports = {fileUpload};