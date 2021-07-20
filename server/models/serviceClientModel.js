const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
     name: String,
     current_residence:[
         {
             city: String,
             province: String
        }
     ],
    legal_residence:[
        {
          city: String,
          province: String
        },
    ],
   VAT_registration_number: Number,
    images: {
    type: Array,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("serviceClient", productSchema);
