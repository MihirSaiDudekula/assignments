const jwt = require('jsonwebtoken');
const { User } = require('../index');

function userMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, 'your-secret-key', async (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).send('User not found');

        req.user = user;
        next();
    });
}

module.exports = userMiddleware;
