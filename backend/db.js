const mongoose = require('mongoose');
require('dotenv').config();

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(
    () => { console.log('connected to DB'); },
    err => { console.error.bind(console, 'connection error:') }
);
const db = mongoose.connection;

module.exports = db;