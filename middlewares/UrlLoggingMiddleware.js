const logger = require('../logger/index');

let urlLogger;

urlLogger = (req, res, next) => {
    if(req.originalUrl === '/favico.ico') {
        next();
    }
    logger.info(req.method + " " + req.originalUrl);
    next();
}

module.exports = urlLogger;