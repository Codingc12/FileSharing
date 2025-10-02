const Links = require('../models/Links');
const jwt = require('jsonwebtoken');

async function createLink(request, response){
    const user_id = request.user.id;
    if(!user_id){
        response.status(401).json({
            Message: "Invalid request"
        });
        return;
    }

    const share_user_id = request.body["sh_us_id"];
    const file_id = request.body["file_id"];
    let password_protected = request.body["password_req"];
    const send_mail = request.body["mail"];

    if(!share_user_id){
        response.status(400).json({
            Message: "Malformed request"
        });
        return;
    }
    if(!file_id){
        response.status(400).json({
            Message: "Malformed request"
        });
        return;
    }
    if(!password_protected){
        password_protected = false;
    }

    try {
        const link = await Links.create(
            {
                fileId: file_id,
                userId: user_id,
                shareUserId: share_user_id,
                passwordProtected: password_protected,
            }
        );
    } catch (error) {
        return response.status(500).json({
            Message: "Failed to create link"
        });
    }
    if(send_mail){
        
    }
    response.status(201).json({
        Link: `http://localhost:1000/links/getFile/${link._id}`
    });
    return;
}

async function sendMail(link,request){
    //Logic To Send Mail
}

async function getFile(request, response){
    const link_id = request.params.id;
    const link = await Links.findById(link_id);
    const user_id = request.user.id;
    
    if(!user_id){
        response.status(400).json({
            Message: "Malformed Request"
        });
        return;
    }

    if (link.passwordProtected && !(user_id === link.shareUserId || user_id === link.userId)) {
        response.status(401).json({
            Message: "Unauthorized Request"
        });
        return;
    }

    if (!process.env.JWT_SECRET) {
        return response.status(500).send("Server configuration error");
    }

    const token = await jwt.sign({
        fileId: link.fileId
    },process.env.JWT_SECRET,{expiresIn:'1m'});

    
    response.redirect(`http://localhost:1000/file/download/file?token=${token}`);
    return;
}

module.exports = {createLink,getFile};