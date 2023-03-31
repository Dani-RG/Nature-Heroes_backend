const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const foundationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  acronym: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
},
  {
    timestamps: true
  });

module.exports = model("Foundation", foundationSchema);
