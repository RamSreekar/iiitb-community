const User = require('../models/UserModel'); 
const userService = require("../services/UserService");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();

exports.register = async (user) => {
    const userEmail = user.email; 
    const password = user.pwd;

    const existingUser = await User.findOne({ userEmail });
    if(existingUser) {
      res.status(401).json({ "message" : "User already exists with given email!" });
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    user.pwd = encryptedPassword;

    await userService.createUser(user);
}

exports.login = async (req) => {
    return new Promise(async (resolve, reject) => {
        const userEmail = req.email; 
        const jwtSecret = process.env.JWT_SECRET;

        const token = jwt.sign({ email: userEmail } , 
                                jwtSecret,
                                {
                                    expiresIn : "24h"
                                }
                        );
        console.log("Token : "+token+"\n");

        const existingUser = await User.findOne({ email : userEmail });

        console.log("existingUser : ")
        console.log(existingUser);

        if(!existingUser) {
            console.log("User invalid!");
            const error = new Error("User doesn't exist with given email!");
            error.statusCode = 401;

            reject(error);
            return;
        }

        const passwordsMatching = await bcrypt.compare(existingUser.pwd, req.pwd); 
        if(!passwordsMatching) {
            console.log("Passwords not matching!");
            const error = new Error("Password incorrect!");
            error.statusCode = 401;

            reject(error);
        }

        resolve({ token : token });
    })
}
