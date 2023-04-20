const userService = require('../services/userService');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } 
  catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const requiredUser = await userService.getUserById(req.params.userId);

    res.status(200).json(requiredUser);
  } 
  catch(err) {
    next(err);
  }
};
