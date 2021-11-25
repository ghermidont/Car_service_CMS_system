// Schema options here: https://mongoosejs.com/docs/schematypes.html#strings
const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({ name: String } );

module.exports = mongoose.model("testModel", testSchema, "test");
