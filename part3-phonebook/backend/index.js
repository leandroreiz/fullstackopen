require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

// Constants
const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('build'));
app.use(cors());

morgan.token('data', (request) => {
  return JSON.stringify(request.body);
});
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms - :data'
  )
);

// Routes
app.get('/info', (_, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

// Get all phonebook entries
app.get('/api/persons', (_, response) => {
  Person.find().then((persons) => {
    response.json(persons);
  });
});

// Get one specific phonebook entry
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// Create a new entry
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'please fill all the fields' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });
});

// Delete one entry by id
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
});

// Middleware that are executed after routes
const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// Server start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
