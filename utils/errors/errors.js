class AppError extends Error{
    constructor(msg, status){
        super();
        this.message = msg;
        this.status = status;
    };
};

function wrapAsync(anAsyncFunction){
    return function (req, res, next){
        anAsyncFunction(req, res, next).catch(e => next(e))
    };
};


module.exports = {AppError, wrapAsync}