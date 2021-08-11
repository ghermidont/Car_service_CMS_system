"use strict";

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
        data: Date,
        licensePlate: {
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
            text: true
        },
        anomalies: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true
        },
        checks: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true
        },
        actions: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true
        },
        note: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true
        },
        damage: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true
        },
        identifier: [
            {
                type: ObjectId,
                ref: "identifier",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("providedServiceSchema", providedServiceSchema);