const mongoose = require("mongoose");

const appUserSchema = new mongoose.Schema({
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
}, {
  toJSON: {
    transform: function (doc, ret) {
      var fieldsToDelete = ["pwd", "refToken", "__v"];
      fieldsToDelete.forEach(field => {
        delete ret[field];
      });
      
      return ret;
    }
  }
});

module.exports = mongoose.model("User", appUserSchema);
