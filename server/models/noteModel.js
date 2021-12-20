// Schema options here: https://mongoosejs.com/docs/schematypes.html#strings
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "userModel",
    },   
    id: {
        type: String,
        trim: true,
        required: true,
        //maxlength: 32,
        text: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
        //maxlength: 32,
        text: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
        //maxlength: 32,
        text: true,
    },   
},
{ timestamps: true }
);

module.exports = mongoose.model("noteModel", noteSchema, "notes");