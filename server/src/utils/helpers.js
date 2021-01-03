// helpers.js
// Contains non-middleware helper functions

// Async wrapper function which passes any errors
// produced by async code (ie. db requests)
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(e => next(e));
    }
};

module.exports = {
    catchAsync
};