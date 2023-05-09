const userService = require("../services/UserService");
const authService = require("../services/AuthService");
const jwtHelper = require("../security/JwtHelper");

const cookieParser = require('cookie-parser')

exports.registerUser = async (req, res, next) => {
  try {
    const user = req.body;

    await userService.createUser(user);

    res.status(200).json({ message: "User created!" });
  } catch (err) {
    res.status(500).json({ error: err.name, message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const user = req.body;
    
    await authService.register(user);
    
    res.status(200).json({ message: "User created!" });
  } catch (err) {
    res.status(500).json({ error: err.name, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = req.body;

    const response = await authService.login(user);

    res.status(200).cookie("token", response.token).json({ token : response.token, userType : response.userType });
  } catch (err) {
    var statusCode = err.statusCode;

    if(statusCode == null) statusCode = 500;

    // res.status(statusCode).json(err);
    res.status(statusCode).json({ error: err.name, message: err.message });
  }
} 

exports.validateToken = async (req, res, next) => {
  jwtHelper.validateToken(req)
    .then(() => {
      next();
    })
    .catch((err) => {
      var statusCode = err.statusCode;

      if(statusCode == null) statusCode = 500;

      res.status(statusCode).json({ error: err.name, message: err.message });
    });
}
