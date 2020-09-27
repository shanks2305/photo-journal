const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./Helper');

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const enc_password = await bcrypt.hash(password, salt);
        const user = new User({
            name: name,
            email: email,
            password: enc_password
        });
        const u = user.save((err) => {
            if (err) {
                return res.status(400).json({ error: "Error while creating user" });
            }
        });
        return res.status(200).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Error while creating user" });
    }

});

router.post('/signin', (req, res) => {
    const oneDayToSeconds = 24 * 60 * 60;
    const { email, password } = req.body;
    User.findOne({ email: email }, async (err, user) => {
        if (err || !user) {
            console.error(err);
            return res.status(400).json({ error: "Enter valid credential" });
        }
        try {
            const validate = await bcrypt.compare(password, user.password);
            if (!validate) {
                return res.status(400).json({ error: "Cannot validate user" });
            } else {
                const token = await jwt.sign({ id: user._id }, process.env.SECRET);
                res.cookie('authtoken', token, {
                    maxAge: oneDayToSeconds,
                    httpOnly: true,
                    // Forces to use https in production
                    secure: process.env.NODE_ENV === 'production' ? true : false
                });
                return res.status(200).json({ id: user._id, token: token });
            }
        } catch (error) {
            console.error(error)
            return res.status(400).json(error);
        }
    });
});

router.get('/:uid', authenticate, (req, res) => {
    const uid = req.params.uid;
    User.findById(uid, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User not found" });
        }
        return res.status(200).json({ id: user._id, email: user.email, photos: user.photos })
    });
});


module.exports = router;