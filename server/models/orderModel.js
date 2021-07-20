const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
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
        operator: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true,
        },
        anomalies: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true,
        },
        controls: {
            type: String,
            required: true,
            maxlength: 2000,
            text: true,
        },
        work_done: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true,
        },
        notes: {
            type: String,
            trim: true,
            required: false,
            maxlength: 500,
            text: true,
        },
        damage: {
            type: String,
            trim: true,
            required: false,
            maxlength: 500,
            text: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
