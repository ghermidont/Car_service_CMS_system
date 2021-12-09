// Schema options here: https://mongoosejs.com/docs/schematypes.html#strings
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
        name: {
            type: String,
            //unique: true,
            trim: true,
            required: true,
            //maxlength: 30,
            text: true,
        },
        surname: {
            type: String,
            //unique: true,
            trim: true,
            required: true,
            //maxlength: 30,
            text: true,
        },
        date: {
            type: String,
            //unique: true,
            trim: true,
            required: true,
            //maxlength: 50,
            text: false
        },
        fiscal_code: {
            type: String,
            unique: true,
            trim: true,
            required: true,
            //maxlength: 50,
            text: false
        },
        address:{
            type: String,
            //unique: true,
            trim: true,
            required: true,
            //maxlength: 50,
            text: false
        },
        city:{
            type: String,
            //unique: true,
            trim: true,
            required: true,
            //maxlength: 50,
            text: true,
        },
        province:{
            type: String,
            //unique: true,
            trim: true,
            required: true,
            //maxlength: 50,
            text: true,
        },
        notes:{
            type: String,
            //unique: true,
            trim: true,
            required: true,
            //maxlength: 50,
            text: true,
        },
        mobile: {
            type: String,
            unique: true,
            required: true,
            index: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            index: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model( "clientModel", clientSchema, "clients" );
