const logger = require('../logger/index');

let urlLogger;

// exports.urlLogger = (req, res, next) => {
//     if(req.originalUrl === '/favico.ico') {
//         next();
//     }

//     logger.info(JSON.stringify({
//         "Method" : req.method,
//         "Url" : req.originalUrl
//     }));
    
//     next();
// }

exports.postApiCallLogger = (req, res, next) => {
    next();
    const responseStatus = res.status;
    const responseJson = res.json;

    res.status = (statusCode) => {
        logger.info(JSON.stringify({
            "Method" : req.method,
            "Url" : req.originalUrl,
            'Status' : statusCode
        }));

        // return res.status(statusCode).json(responseJson)
        
        if(statusCode !== 200) {
            
            res.json = (body) => {
                res.body = body;
                logger.error("Message : " + JSON.stringify(body))
              }

            //   return res.status(statusCode).json(body);
        }
        
        return responseStatus.call(res, statusCode);
        
    }
}

// module.exports = urlLogger;