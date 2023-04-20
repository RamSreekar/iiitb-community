const userService = require('../services/UserService');

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

    if(requiredUser == null)
      res.status(404).json({"message" : "User doesn't exist with given id!"});

    res.status(200).json(requiredUser);
  } 
  catch(err) {
    //next(err);
    res.status(500).json({"message" : "Invalid ObjectId: userId"});
  }
};
