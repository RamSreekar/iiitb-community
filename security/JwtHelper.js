const jwt = require('jsonwebtoken');

require("dotenv").config();

exports.generateToken = (userEmail) => {
    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign({ email: userEmail } , 
        jwtSecret,
        {
            expiresIn : "24h"
        }
    );

    return token;
}

exports.validateToken = async (req) => {
    return new Promise (async (resolve, reject) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token) {
            const error = new Error("Token is null!");
            error.statusCode = 401;
            reject(error);
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if(err) {
                const error = new Error("Token is invalid or malformed!");
                error.statusCode = 401;
                reject(error);
                return;
            }
        });
        
        resolve({ "message" : "Token validation successful!" });
    });
}
