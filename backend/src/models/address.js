const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: { type: String, required: true},
    address: { type: String, required: true},
    city: { type: String, required: true},
    location: {
        type: {type: String, required: true},
        coordinates: [
            {type: Number},
            {type: Number}
        ]
    },
    contactNo: { type: String, required: true, length: 10},
});

addressSchema.index({ location: "2dsphere"});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model("Address", addressSchema);
