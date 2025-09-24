const express = require('express');
const File = require('../models/files');
const User = require('../models/User');
const Link = require('../models/Links');


const route = express.Router();

route.get("/testdb", async (request, response) => {
    try {
        const user_test = await User.create({
            name: "Test User",
            email: "test@example.com",
            password: "test123"
        });
        const file_test = await File.create({
            filePath: "dummy/path",
            size: 0,
            Upload_user: user_test._id,
            fileName: "dummy.txt",
            type: "application/txt"
        });
        const link_test = await Link.create({
            fileId: file_test._id,
            userId: user_test._id,
            shareUserId: user_test._id
        });

        response.status(200).json({
            user: user_test,
            file: file_test,
            link: link_test
        });
    } catch (error) {
        console.error('Database test error:', error);
        response.status(500).json({ error: 'Database operation failed' });
    }
});

module.exports = route;