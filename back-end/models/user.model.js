const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('user', UserSchema);
