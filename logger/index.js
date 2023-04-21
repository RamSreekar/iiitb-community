const developmentLogger = require('./developmentLogger');

require("dotenv").config();


let logger = null;

// if(process.env.NODE_ENV == 'production') {
//     logger = productionLogger();
// }

if(process.env.NODE_ENV === 'development') {
    logger = developmentLogger();
}

module.exports = logger;