const mongoose = require('mongoose');

function FileSchema(){
    const fileSchema = mongoose.Schema({
        filePath: {
            required: true,
            type: String,
        },
        uploadDate: {
            type: Date,
            default: Date.now
        },
        shareLinks: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Link"
        },
        size: {
            type: mongoose.Schema.Types.BigInt,
            required: true
        },
        Upload_user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    });
    return mongoose.models.File || mongoose.model("File",fileSchema);
}

module.exports = FileSchema();