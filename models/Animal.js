const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const animalSchema = new Schema({
  common_name: {
    type: String,
    trim: true,
    required: true
  },
  scientific_name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  class_name: {
    type: String,
    trim: true,
    required: true
  },
  family_name: {
    type: String,
    trim: true,
    required: true
  },
  habitat_type: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  species_status: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  database_link: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  });

module.exports = model("Animal", animalSchema);