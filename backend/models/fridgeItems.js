const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    quantity: Number,
    date: Date
});

module.exports = mongoose.model('FridgeItem', schema);