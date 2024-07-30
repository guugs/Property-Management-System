const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = 500;
    let message = 'An unexpected error occurred';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized access';
    } else if (err.name === 'ForbiddenError') {
        statusCode = 403;
        message = 'Forbidden access';
    } else if (err.name === 'NotFoundError') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message: message,
        error: process.env.NODE_ENV === 'production' ? {} : err
    });
};

module.exports = errorHandler;