const userService = require('../services/UserService');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } 
  catch (err) {
    res.status(500).json({"error": err.name , "message" : err.message});
  }
};

exports.getUserById = async (req, res) => {
  try {
    const requiredUser = await userService.getUserById(req.params.userId);

    if(requiredUser == null)
      res.status(404).json({"message" : "User doesn't exist with given id!"});
    else
      res.status(200).json(requiredUser);
  } 
  catch(err) {
    res.status(500).json({"error": err.name , "message" : err.message});
  }
};
