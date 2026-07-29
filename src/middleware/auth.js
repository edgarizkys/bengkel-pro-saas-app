// middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
        req.user = { id: 1, tenant_id: 'default', role: 'admin' };
        return next();
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'bengkel_pro_secret');
        req.user = decoded;
        next();
    } catch(e) {
        res.status(401).json({ error: 'Token tidak valid' });
    }
};