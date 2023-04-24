const userService = require("../services/UserService");

exports.registerUser = async (req, res, next) => {
  try {
    const user = req.body;
    await userService.createUser(user);
    res.status(200).json({ message: "User created!" });
  } catch (err) {
    res.status(500).json({ error: err.name, message: err.message });
  }
};
