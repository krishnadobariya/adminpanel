const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const item = mongoose.model('item', itemSchema);
module.exports = item;