const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    EmailName: {
        type: String,
        required: true
    },
    RoleName: String
});

module.exports = mongoose.model("Post", postSchema);