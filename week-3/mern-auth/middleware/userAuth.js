const jwt = require('jsonwebtoken');

const userAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'Token missing' });
    }

    try {
        const decryptedObj = jwt.verify(token, process.env.JWT_SECRET);
        if (decryptedObj && decryptedObj.userId) {
            // Attach user info to the request object
            req.user = decryptedObj;
            next();
        } else {
            res.status(403).json({ msg: 'You are not authenticated' });
        }
    } catch (e) {
        res.status(403).json({ msg: 'Invalid token', error: e.message });
    }
};

module.exports = userAuthMiddleware;
