// Schema options here: https://mongoosejs.com/docs/schematypes.html#strings
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "userModel",
    },
    client: {
        type: mongoose.Schema.Types.ObjectId, ref: "clientModel"
    },
    brand: {
        type: String,
        trim: true,
        required: true,
        //maxlength: 32,
        text: true,
    },
    model: {
        type: String,
        trim: true,
        required: true,
        //maxlength: 32,
        text: true,
    },
    licensePlate: {
        type: String,
        trim: true,
        required: true,
        //maxlength: 32,
        text: true,
    },
    revisions: {
        start: {
            type: String,
        },
        end: {
            type: String,
        }
    },
    alerts: {
        read: {
            type: Boolean,
        },
        show: {
            type: Boolean,
        }
    },
    km: {
        type: String,
        trim: true,
        required: true,
        //maxlength: 32,
        text: true,
    },
    year: {
        type: String,
        trim: true,
        required: true,
        //maxlength: 32,
        text: true,
    },
    // client: {
    //     type: String,
    //     trim: true,
    //     required: true,
    //     //maxlength: 32,
    //     text: true,
    // },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("carModel", carSchema, "cars");