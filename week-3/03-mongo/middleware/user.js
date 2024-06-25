const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    const username = req.headers.username;
    const password = req.headers.password;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            next();
        } else {
            res.status(403).json({ msg: "User doesn't exist" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
}

module.exports = userMiddleware;
