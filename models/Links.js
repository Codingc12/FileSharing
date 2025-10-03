const mongoose = require('mongoose');

function Links(){
    const linkSchema = mongoose.Schema({
        fileId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        shareUserId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        passwordProtected: {
            type: Boolean,
            default: false
        },
        linkExp: {
            type: Date,
            default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
    });

    linkSchema.index({ linkExp: 1 }, { expireAfterSeconds: 0 });
    return mongoose.models.Links || mongoose.model("Links",linkSchema);
}

module.exports = Links();