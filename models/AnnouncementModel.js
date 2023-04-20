const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    className: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    link: {
        type: String
    }
}, {
    toJSON : {
        transform : function(doc, ret) {
            var fieldsToDelete = ["__v"];
            fieldsToDelete.forEach(field => {
                delete ret[field];
            });

            return ret;
        }
    }
});

module.exports = mongoose.model("Announcement", announcementSchema);