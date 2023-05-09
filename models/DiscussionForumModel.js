const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    branch: {
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
    replies: {
      type: Object,
      required : true,
      default: {},
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

module.exports = mongoose.model("DiscussionForum", questionSchema);