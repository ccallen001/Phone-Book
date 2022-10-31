require('dotenv').config();

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('\x1b[42m%s\x1b[0m', 'mongoose connected'))
  .catch((err) => {
    console.error('\x1b[41m%s\x1b[0m', `mongoose failed to connect: ${err}`);
    mongoose.connection.close();
    process.exit(1);
  });

const model = mongoose.model(
  'PhoneBookEntries',
  new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
  }).set('toJSON', {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  })
);

module.exports = model;