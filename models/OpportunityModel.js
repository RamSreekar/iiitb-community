const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        default: "NULL",
    },
}, {
  toJSON: {
    transform: function (doc, ret) {
      var fieldsToDelete = ["__v"];
      fieldsToDelete.forEach(field => {
        delete ret[field];
      });
      
      return ret;
    }
  }
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
