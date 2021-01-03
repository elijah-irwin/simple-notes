const baseErrorHandler = (err, req, res, next) => {
    
    // TODO: Log error to log file

    const { status = 500, message = 'An error occured.' } = err;
    const response = { status: status, message: message };

    if (process.env.ENV !== 'prod') {
        response.stack = err.stack;
    }

    res.status(status).json(response);
};

module.exports = {
    baseErrorHandler
};
