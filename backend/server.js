const cors = require('cors');
const express = require('express');
const db = require('./db');
const routesFridgeItems = require('./routes/fridgeItems');
const routesUsers = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(express.json());
// enable cors for all requests
app.use(cors());

app.use('/fridgeItems', routesFridgeItems);
app.use('/users', routesUsers);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});