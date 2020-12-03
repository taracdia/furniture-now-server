const mongoose = require("mongoose");
const userSchema = require("./user").schema;

const commentSchema = new mongoose.Schema({
    author: userSchema,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

exports.model = mongoose.model("Comment", commentSchema);
exports.schema = commentSchema;