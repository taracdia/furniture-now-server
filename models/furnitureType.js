const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const furnitureSchema = require("./furniture");

const furnitureTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    furnitures: [furnitureSchema]
});

const FurnitureType = mongoose.model("FurnitureType", furnitureTypeSchema);

module.exports = FurnitureType;