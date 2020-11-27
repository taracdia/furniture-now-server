const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const furnitureSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,//type price
        required: true
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
    }
});

const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;