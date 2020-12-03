const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
    //TODO: add address stuff?
});

const User = mongoose.model("User", userSchema);

exports.schema = userSchema;
exports.model = User;