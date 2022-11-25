const jwt = require('jsonwebtoken');
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

const verifyToken = (req, res, next) => {
    try {
        jwt.verify(req.cookie.accessToken, JWT_AUTH_TOKEN, (err, phone) => {
            if (phone) {
                req.phone = phone;
                next();
            } else if (err.message === 'TokenExpiredError') {
                return res.status(403).send({ success: false, msg: 'Access Token Expired' });
            } else {
                res.status(403).send({ err, msg: 'User Not authenticated' });
            }
        })    
    } catch (error) {
        res.status(403).send({ error: error.message });
    }
}

module.exports = { verifyToken };