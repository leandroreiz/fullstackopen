const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(() => {
  console.log('Database connected!');
});

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
