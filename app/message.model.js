const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    messageText: String,
    nationality: String,
    age: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);