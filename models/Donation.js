const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const donationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  amount: {
    type: Number,
    default: 1,
    required: [true, 'Please specify your donation.']
  }
},
  {
    timestamps: true
  });

module.exports = model("Donation", donationSchema);
