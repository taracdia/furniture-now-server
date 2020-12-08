const mongoose = require("mongoose");
const passportLocalMongoose = require("Passport-local-mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    }
    //TODO: add address stuff?
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

exports.schema = userSchema;
exports.model = User;