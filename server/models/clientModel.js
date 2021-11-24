"use strict";
// Schema options here: https://mongoosejs.com/docs/schematypes.html#strings

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 30,
            text: true,
        },
        surname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 30,
            text: true,
        },
        date: Date,
        fiscal_code: Number,
        address:{
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            text: false
        },
        city:{
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            text: true,
        },
        province:{
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            text: true,
        },
        notes:{
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            text: true,
        },
        mobile: Number,
        email: {
            type: String,
            required: true,
            index: true,
        },
        cars: [],
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        relation: { type: ObjectId, ref: "userModel" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("clientModel", clientSchema, "clients");
