const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGO_DB_URI;


const connectDB = async () => {
  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Mongodb Connected');
    })
    .catch((error) => {
      console.log('Mongodb Error', error);
    });
};

module.exports = connectDB;
