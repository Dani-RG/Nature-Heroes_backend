require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Animal = require('../models/Animal');
const animals = require('../db/animalsData');

mongoose
  .connect(process.env.MONGO_URL)
  .then(response  => {
    console.log(`Connected to Mongo! Database name: "${response.connections[0].name}"`);
  })
  .then(() => {
    return Animal.deleteMany({})
  })
  .then(() => {
    return Animal.create(animals)
  })
  .then((createdAnimals) => {
    console.log(`Inserted ${createdAnimals.length} animals in the database`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  })
  .finally(() => {
    mongoose.connection.close()
  })