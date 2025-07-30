const {
    successResponse,
    createdResponse,
    unauthorizedResponse,
    notFoundResponse,
    errorResponse
} = require('../utils/response.utils');

function responseMiddleware(req, res, next) {
    res.success = (message, data) => successResponse(res, message, data);
    res.created = (message, data) => createdResponse(res, message, data);
    res.unauthorized = (message) => unauthorizedResponse(res, message);
    res.notFound = (message) => notFoundResponse(res, message);
    res.error = (message) => errorResponse(res, message);
    next();
}

module.exports = responseMiddleware;

