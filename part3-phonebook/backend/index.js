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
// Phonebook information
app.get('/info', (_, response) => {
  const date = new Date();

  Person.find().then((persons) => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    );
  });
});

// Create a new entry
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

// Read all phonebook entries
app.get('/api/persons', (_, response, next) => {
  Person.find()
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

// Read one specific phonebook entry
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

// Update entry
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// Delete one entry by id
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end();
  });
});

// No endpoint was found
const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    console.log('🔴', error.message);
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    console.log('🔴', error.message);
    return response.status(400).send({ error: error.message });
  } else if (error.code === 11000) {
    console.log('🔴', error.message);
    return response.status(409).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

// Server start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
