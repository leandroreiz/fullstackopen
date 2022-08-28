const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please inform the password: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log(
    'Please inform name and number: node mongo.js <password> <name> <number>'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://admin:${password}@part3.56gbrf2.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    // print phonebook
    if (process.argv.length === 3) {
      console.log('phonebook:')
      Person.find().then((result) => {
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    }

    // add and print new person details
    if (process.argv.length === 5) {
      const person = new Person({
        name,
        number,
      })

      return person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      })
    }
  })
  .catch((err) => {
    console.log(err)
  })
