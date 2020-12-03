const mongoose = require("mongoose");
const commentSchema = require("./comment").schema;
require("mongoose-currency").loadType(mongoose);

const furnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: mongoose.Types.Currency,//stored as integers so multiply by 100
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
});

const Furniture = mongoose.model("Furniture", furnitureSchema);
exports.schema = furnitureSchema;
exports.model = Furniture;