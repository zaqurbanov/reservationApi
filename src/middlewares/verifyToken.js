const { JWT_SECRET_KEY } = require("../config/env");
const jwt = require('jsonwebtoken')
const HTTP_CODE = require("../config/HTTP_CODE");
const Response = require("../config/response");
const getCatchError = require("../helpers/catchError");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(HTTP_CODE.client_error.forbidden).json({
            message: "Access denied. No token provided",
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = await jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(HTTP_CODE.client_error.forbidden).json({
            message: "Invalid token",
        });
    }
};


module.exports = verifyToken