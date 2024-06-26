const jwt = require('jsonwebtoken');
const { Admin } = require('../index');

function adminMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, 'your-secret-key', async (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        
        const admin = await Admin.findById(decoded.id);
        if (!admin) return res.status(404).send('Admin not found');

        req.admin = admin;
        next();
    });
}

module.exports = adminMiddleware;
