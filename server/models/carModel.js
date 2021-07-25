const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true,
    },
    model: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true,
    },
    license_plate: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true,
    },
    revision: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true,
    },
    km: Number,
    year: Number,
    client: {
    type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    identifier: [
    {
        type: ObjectId,
        ref: "identifier",
    }
    ]
},
    { timestamps: true }
);

module.exports = mongoose.model("carSchema", carSchema);
