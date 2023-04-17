const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  image: {
    type: String,
    default: 'https://e1.pxfuel.com/desktop-wallpaper/360/419/desktop-wallpaper-geometric-animal-animal.jpg'
  },
  donated_total: {
    type: Number,
    default: 0,
  }
},
  {
    timestamps: true
  });

module.exports = model("User", userSchema);
