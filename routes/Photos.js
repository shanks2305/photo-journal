const Photos = require('../model/Photos');
const User = require('../model/User');
const router = require('express').Router();
const { authenticate } = require('./Helper');

router.post('/add-photo', (req, res) => {
    const { uid, name, about, img, lat, long } = req.body;
    try {
        const photo = new Photos({ user: uid, name, about, img, lat, long });
        const p = photo.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: "Cannot add a photo" });
            }
        });
        User.findOneAndUpdate({ _id: uid }, { $push: { photos: p } }, (err, resp) => {
            if (err || !resp) {
                console.log(err);
                return res.status(400).json({ error: "Cannot add a photo" });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Cannot add a photo" });
    }
});

module.exports = router;