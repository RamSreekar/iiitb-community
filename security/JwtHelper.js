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