const express = require('express');
const {validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


async function signUp(request,response){
    try{
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            response.status(403).json({
                errors: errors.array()
            });
            return;
        }
        const new_user =  await User.create({
            name: request.body["user_name"],
            email: request.body["user_email"],
            password:  await bcrypt.hash(request.body["password"],10)
        });
        response.status(201).json({
            "Message":"User Created Successfully"
        });
    }
    catch (e){
        response.status(500).json({
            "error": `Error: ${e.message}`
        });
    }

}

async function login(request,response){
    try{
        if(!request.body.user_name){
            response.status(403).json({
                "Message": "Username is required",
                "_id": -1
            });
            return;
        }
        const user = await User.findOne({"name": request.body.user_name},'password _id');
        if(!user){
            response.status(404).json({
                "Message": "Invalid Credentials",
                "_id": -2
            });
            return;
        }
        const isMatch = await bcrypt.compare(request.body.password, user.password);
        if(!isMatch){
            response.status(404).json({
                "Message": "Invalid Credentials",
                "_id": -3
            });
            return;
        }
        // generate JWT and send it in the HTTP response
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
            );
        response.status(200).json({
            Message: "Login successful",
            token: token
            });
    }
    catch (e){
        response.status(500).json({
            "Error": `ErrMsg: ${e.message}`
        });
    }
}

module.exports = {signUp, login}