require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Animal = require('../models/Animal');
const animals = require('../db/animalsData');

mongoose
  .connect(process.env.MONGO_URL)
  .then(async (response)  => {
    console.log(`Connected to Mongo! Database name: "${response.connections[0].name}"`);
    
    for (const animal of animals) {
      const existingAnimal = await Animal.findOne({ scientific_name: animal.scientific_name });

      if (existingAnimal) {
        await Animal.findOneAndUpdate({ _id: existingAnimal._id }, animal);
      } else {
        const newAnimal = new Animal(animal);
        await newAnimal.save();
      }
    }

    console.log(`Inserted ${animals.length} animals in the database`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
  