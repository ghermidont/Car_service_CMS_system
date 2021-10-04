// Schema options here: https://mongoosejs.com/docs/schematypes.html#strings
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
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
      role: {
          type: String,
          default: "ordinary",
        },
      slug: {
          type: String,
          unique: true,
          lowercase: true,
          index: true,
        },
      _id: ObjectId
  },
  { timestamps: true }
);

module.exports = mongoose.model("userSchema", userSchema);
