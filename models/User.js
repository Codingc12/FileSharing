const mongoose = require('mongoose');

function User(){
    const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    return mongoose.models.User || mongoose.model("User",userSchema);
}

module.exports = User();