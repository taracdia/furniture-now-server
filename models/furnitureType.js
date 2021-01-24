const mongoose = require("mongoose");
const furnitureSchema = require("./furniture").schema;

const furnitureTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	furnitures: [furnitureSchema], //todo: mongoose populate
});

const FurnitureType = mongoose.model("FurnitureType", furnitureTypeSchema);

module.exports = FurnitureType;
