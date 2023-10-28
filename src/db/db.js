const mongoose = require('mongoose');

const uri = "mongodb+srv://lathikasunder11:1LgXFnGxYvC9ESDj@cluster0.wxs8awf.mongodb.net/?retryWrites=true&w=majority";

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB using Mongoose!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getClient() {
  return mongoose.connection; // Return the mongoose connection object
}

module.exports =  connectToDatabase, {

  getClient
};
