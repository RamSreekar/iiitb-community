const mongoose = require("mongoose");

const registeredUsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  validGroups: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", appUserSchema);
