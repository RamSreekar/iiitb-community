const { getAllUsers } = require('../services/userService');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
