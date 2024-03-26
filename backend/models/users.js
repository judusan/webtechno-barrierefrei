const mongoose = require('mongoose');

// users Schema
const usersSchema = new mongoose.Schema({
    forename: String,
    surname: String,
    email: String,
    username: String,
    password: String
});

// Exporting our model objects
module.exports = mongoose.model('User', usersSchema);