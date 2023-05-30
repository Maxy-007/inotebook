const mongoose = require('mongoose');

const mongoUri = "mongodb://0.0.0.0:27017/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
