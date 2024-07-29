const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        message: err.message || 'An unexpected error occurred',
        error: process.env.NODE_ENV === 'production' ? {} : err
    });
};

module.exports = errorHandler;