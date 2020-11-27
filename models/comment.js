const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: String,//type user
        required: true
    },
    furniture: {
        type: String, //type furniture
        required: true
    },
    rating: {
        type: Number,
        //min 1 max 5
        required: true
    },
    text: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;