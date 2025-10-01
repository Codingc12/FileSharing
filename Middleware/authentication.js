const express = require('express');
//const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


//is authenticated
function isAuth(req,res,next){
    // Replace this:
    // With header-based extraction and validation:
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send("Missing or invalid Authorization header");
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token,
        process.env.JWT_SECRET,
        (error,decoded) => {

            if(error){
                if (error.name === 'TokenExpiredError'){
                    res.status(401).send("Token expired");
                    return;
                }
                res.status(403).send("Invalid Token");
                return;
            }
            req.user = { id: decoded._id };
            next();
        }
    )
}
module.exports = isAuth;