const User = require('../models/AppUser');

exports.getAllUsers = async () => {
  const users = await User.find({});
  return users;
};
