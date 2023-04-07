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
    default: 'https://t4.ftcdn.net/jpg/05/75/02/23/240_F_575022368_chS0812Iw8d8xbb4cTQayizIscfm0d2z.jpg'
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
