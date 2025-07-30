const jwt = require('jsonwebtoken');
const {
    unauthorizedResponse,
    forbiddenResponse
} = require('../utils/response.utils');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        res.unauthorized = (message) => unauthorizedResponse(res, message, data);
        // res.success = (message, data) => successResponse(res, message, data);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.forbiddenResponse = (message) => forbiddenResponse(res, message, data);
        }

        req.user = user; // token payload bisa diakses di req.user
        next();
    });
};

module.exports = authenticateToken;
