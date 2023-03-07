const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userSchema = mongoose.Schema({
    Username: {
        required: true,
        type: String
    },
    Email: {
        required: true,
        type: String
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Token: {
        type: String,

    }
}, {
    timestamps: true
})


userSchema.methods.generateauthtoken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SCREAT_KEY);
        this.Token = token
        await this.save();
        return token
    } catch (error) {
        console.log(error);
    }
}

const user = mongoose.model('user', userSchema);
module.exports = user;