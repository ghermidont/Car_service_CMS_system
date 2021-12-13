// Schema options here: https://mongoosejs.com/docs/schematypes.html#strings
const mongoose = require( "mongoose" );

const userSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        status: {
            type: String,
            trim: true,
            required: true,
        },company_name: {
            type: String,
            trim: true,
            required: true,
        },
        current_residence: {
            type: String,
            trim: true,
            required: true,
        },
        current_city:{
            type: String,
            trim: true,
            required: true,
        },
        current_province:{
            type: String,
            trim: true,
            required: true,
        },
        official_residence: {
            type: String,
            trim: true,
            required: true,
        },
        official_city:{
            type: String,
            trim: true,
            required: true,
        },
        official_province:{
            type: String,
            trim: true,
            required: true,
        },
        fiscal_code: String,
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
