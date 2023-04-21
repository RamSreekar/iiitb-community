const logger = require('../logger/index');

let urlLogger;

urlLogger = (req, res, next) => {
    logger.info(req.method + " " + req.originalUrl);
    next();
}

module.exports = urlLogger;