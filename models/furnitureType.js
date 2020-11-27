const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const furnitureTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const FurnitureType = mongoose.model("FurnitureType", furnitureTypeSchema);

module.exports = FurnitureType;