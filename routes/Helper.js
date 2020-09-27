const jwt = require('jsonwebtoken');


exports.authenticate = async (req, res, next) => {
    const token = req.cookie.authtoken;
    try {
        const verify = await jwt.verify(token, process.env.SECRET);
        if (!verify) {
            return res.status(400).json({ error: "ACCESS DENIED" });
        }
        next
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "ACCESS DENIED" });
    }
}