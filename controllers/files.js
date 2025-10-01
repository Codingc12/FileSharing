const File = require('../models/files');
const User = require('../models/User');
const multer = require('multer');
const upload = require('../upload');
const mongoose = require('mongoose');
const path = require('path');

const fileUpload = async (request, response) => {
    const data = request.file;

    console.log("File saved at folder:", data.destination);
    console.log("Full path to file:", data.path);

    if (validateType(data)){
        const file = await File.create({
            filePath: data.path,
            size: data.size,
            Upload_user: request.user.id,
            fileName: data.filename,
            type: data.mimetype
        });
        response.status(200).json({
        "Message": "File Uploaded Successfully",
        "id": file.id
    });
    }
    else{
        response.status(403).json({
            "Message": "File type not allowed",
            "error_no": 403
        });
    }

    
};
async function fileDownload(request, response){
    try{
        const fileId = request.params.id;
        const file = await File.findById(fileId,'filePath fileName')
        if(!file){
            response.status(404).json({
                "Message": "File not found"
            });
            return;
        }
        const filePath = path.resolve(file.filePath);
        response.download(filePath, file.fileName, (err) => {
            if(err){
                console.log(`[ERROR] ${err.message}`);
                if(!response.headersSent){
                    response.status(500).json({Message:"InternalError"});
                }
            }
        });
        return
    }
    catch (e){
        console.log(`[ERROR] ${err.message}`);
        if(!response.headersSent){
            response.status(500).json({ message: "Server error", error: e.message });
        }
    }
    

}


function validateType(file){
    const accepted_types = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
    return accepted_types.includes(file.mimetype);
}
module.exports = {fileUpload, fileDownload};