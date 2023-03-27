require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Foundation = require('../models/Foundation');
const foundations = require('../db/foundationsData');

mongoose
  .connect(process.env.MONGO_URL)
  .then(response  => {
    console.log(`Connected to Mongo! Database name: "${response.connections[0].name}"`);
  })
  .then(() => {
    return Foundation.deleteMany({})
  })
  .then(() => {
    return Foundation.create(foundations)
  })
  .then((createdFoundations) => {
    console.log(`Inserted ${createdFoundations.length} foundations in the database`)
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  })
  .finally(() => {
    mongoose.connection.close()
  })