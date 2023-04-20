const User = require('../models/UserModel');

exports.getAllUsers = async () => {
  const users = await User.find({});

  return users;
};

exports.getUserById = async (userId) => {
  const requiredUser = await User.findById(userId);

  return requiredUser;
};
