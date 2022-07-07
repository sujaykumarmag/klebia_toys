const errorHandler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
    res.status(status);
    res.json({
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        errorCode: err.process
    })
}

module.exports = {
    errorHandler
}