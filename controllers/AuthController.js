const userService = require("../services/UserService");
const authService = require("../services/AuthService");

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

    res.status(200).json(response);
  } catch (err) {
    // const statusCode = err.statusCode;

    res.status(401).json({ error: err.name, message: err.message });
  }
} 
