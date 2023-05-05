const User = require('../models/UserModel'); 
const userService = require("../services/UserService");
const jwtHelper = require("../security/JwtHelper");

const bcrypt = require('bcryptjs');

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

        const existingUser = await findUserByEmail(userEmail);

        console.log("existingUser : ")
        console.log(existingUser);

        if(!existingUser) {
            console.log("User invalid!");
            const error = new Error("User doesn't exist with given email!");
            error.statusCode = 401;

            reject(error);
            return;
        }

        console.log(existingUser.pwd + "\t" + req.pwd + "\n");

        var passwordsMatching;
        try {
            passwordsMatching = await comparePasswords(req.pwd, existingUser.pwd); 
        }
        catch(err) {
            const error = new Error("bcrypt.compare not working!");
            error.statusCode = 500;
            reject(error);
            return;
        }

        if(!passwordsMatching) {
            console.log("Passwords not matching!");
            const error = new Error("Password incorrect!");
            error.statusCode = 401;

            reject(error);
        }

        const token = jwtHelper.generateToken(userEmail);

        console.log("Token : "+token+"\n");

        resolve({ token : token });
    })
}

findUserByEmail = async (userEmail) => {
    return await User.findOne({ email : userEmail });
}

comparePasswords = async (requestRawPassword, actualHashedPassword) => {
    return await bcrypt.compare(requestRawPassword, actualHashedPassword); 
} 
