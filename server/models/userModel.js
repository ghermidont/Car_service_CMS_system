// Schema options here: https://mongoosejs.com/docs/schematypes.html#strings
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        company_name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 30,
            text: true,
        },
        current_residence: {
            type: String,
            trim: true,
            required: true,
            maxlength: 30,
            text: true,
        },
        current_city:{
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            text: true,
        },
        current_province:{
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            text: true,
        },
        official_residence: {
            type: String,
            trim: true,
            required: true,
            maxlength: 30,
            text: true,
        },
        official_city:{
            type: String,
            trim: true,
            required: true,
            maxlength: 20,
            text: true,
        },
        official_province:{
            type: String,
            trim: true,
            required: true,
            maxlength: 20,
            text: true,
        },
        fiscal_code: Number,
        images: [
            {
                public_id: String,
                url: String
            }
        ],
        email: {
            type: String,
            required: true,
            index: true,
        },
        role: {
            type: String,
            default: "basic",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("userModel", userSchema, "users");
