const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

// get all users
router.get('/', async(req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
});

// post one user
router.post('/', async(req, res) => {
    const saltRounds = 10;
    let pwHash = '';
    await bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (errHash, hash) => {
            pwHash = hash;
            const newUser = new User({
                forename: req.body.forename,
                surname: req.body.surname,
                email: req.body.email,
                username: req.body.username,
                password: pwHash
            });
            console.log('newUser', newUser);
            newUser.save();
            res.send(newUser);
        });
    });

});

// get one user via username and password
router.post('/login/:username', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        let sendPw = req.body.password;
        let userPW = user.password;
        bcrypt.compare(sendPw, userPW, (err, result) => {
            if (result) {
                console.log('Passwort korekt!');
                res.send(user);
            } else {
                console.log('falsches Passwort!');
                res.status(403);
                res.send({
                    error: "Wrong password!"
                });
            }
        });
    } catch {
        res.status(404);
        res.send({
            error: "User does not exist!"
        });
    }
});

// get one user via username
router.get('/:username', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        console.log(req.params);
        res.send(user);
    } catch {
        res.status(404);
        res.send({
            error: "User does not exist!"
        });
    }
});

// update one user via id
router.patch('/:username', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })

        if (req.body.email) {
            user.username = req.body.username
        }

        if (req.body.password) {
            user.password = req.body.password
        }

        await User.updateOne({ username: req.params.username }, user);
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User does not exist!" })
    }
});

// delete one user via id
router.delete('/:id', async(req, res) => {
    try {
        await User.deleteOne({ username: req.params.username })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User does not exist!" })
    }
});

module.exports = router;    