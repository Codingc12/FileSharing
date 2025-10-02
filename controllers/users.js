const express = require('express');
//const {validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


async function signUp(request,response){
    try{
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
        const {user_name, password} = request.body;
        const user = await User.findOne({name: user_name});
        if(!user){
            response.status(401).json({
                "message": "Invalid credentials"
            });
            return;
        }
        console.log(request.body.password);
        console.log(user);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("p");
        if (!isMatch) {
            response.status(401).json({
                "message": "Invalid credentials"
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