require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Foundation = require('../models/Foundation');
const foundations = require('../db/foundationsData');

mongoose
  .connect(process.env.MONGO_URL)
  .then(async (response)  => {
    console.log(`Connected to Mongo! Database name: "${response.connections[0].name}"`);
    
    for (const foundation of foundations) {
      const existingFoundation = await Foundation.findOne({ acronym: foundation.acronym });

      if (existingFoundation) {
        await Foundation.findOneAndUpdate({ _id: existingFoundation._id }, foundation);
      } else {
        const newFoundation = new Foundation(foundation);
        await newFoundation.save();
      }
    }

    console.log(`Inserted ${foundations.length} foundations in the database`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
  