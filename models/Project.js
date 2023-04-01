const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  foundation: {
    type: Schema.Types.ObjectId,
    ref: 'Foundation',
    required: [true, 'Please select a foundation.']
  },
  animal: {
    type: Schema.Types.ObjectId,
    ref: 'Animal',
    required: [true, 'Please select an animal.']
  },
  collected_donations: {
    type: Number,
    default: 0
  }
},
  {
    timestamps: true
  });

module.exports = model("Project", projectSchema);
