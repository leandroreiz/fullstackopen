const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url).then(() => {
  console.log('Database connected!')
})

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'You must inform a name'],
    unique: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (number) {
        return /^(\d{2}|\d{3})-\d{6,}/.test(number)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Phone number required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
