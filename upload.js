const multer = require('multer');
const path = require("path");
const fs = require("fs");

const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // recursive true ensures parent dirs are created
}

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "./uploads");
    },
    filename: (req,file,cb) => {
        cb(null,  Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

module.exports = upload;