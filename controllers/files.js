const File = require('../models/files');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
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
async function fileDownloadAdmin(request, response){
    try{
        const userId = request.user.id;
        const adminUserId = await User.findOne({name:"admin"},'_id');
        if (adminUserId._id.toString() !== userId.toString()){
            response.status(401).json({
                Message: "Unauthorized route"
            });
            return;
        }

        const fileId =  request.params.fileId;
        if(!fileId){
            response.status(404).json({
                "Message": "File not found"
            });
            return;
        }
        
        const file = await File.findById(fileId,'filePath fileName');
        if (!file) {
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
        console.log(`[ERROR] ${e.message}`);
        if(!response.headersSent){
            response.status(500).json({ message: "Server error", error: e.message });
        }
    }
    

}

async function fileDownload(request, response){
    try{
        const fileToken = request.query.token;
        if(!fileToken){
            response.status(404).json({
                "Message": "Unauthorized"
            });
            return;
        }
        const fileId={};

        await jwt.verify(fileToken, process.env.JWT_SECRET, (error, decoded) => {
            if(error){
                if (error.name === 'TokenExpiredError'){
                    response.status(401).send("Token expired");
                    return;
                }
                response.status(403).send("Invalid Token");
                return;
            }
            fileId.fileId = decoded["fileId"];
        });
        

        const file = await File.findById(fileId["fileId"],'filePath fileName');
        if (!file) {
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
    } 
    
    catch (e){
        console.log(`[ERROR] ${e.message}`);
        if(!response.headersSent){
            response.status(500).json({ message: "Server error", error: e.message });
        }
    }
    

}


function validateType(file){
    const accepted_types = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
    return accepted_types.includes(file.mimetype);
}
module.exports = {fileUpload, fileDownloadAdmin,fileDownload};