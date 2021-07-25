const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const providedServiceSchema= new mongoose.Schema(
    {
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
            },
        ],
        license_plate: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true,
        },
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
       state: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("providedServiceSchema", providedServiceSchema);
