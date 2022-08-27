require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');
const app = express();
const PORT = process.env.PORT;

// Helper functions
const requestLogger = (request, _, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

// Middleware
app.use(express.static('build'));
app.use(express.json());
app.use(requestLogger);
app.use(cors());

// Routes
// Home page (redirected to static 'build' folder)
app.get('/', (_, response) => {
  response.send('<h1>Hello Express</h1>');
});

// Create a new note
app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    response.status(201).json(savedNote);
  });
});

// Read all notes
app.get('/api/notes', (_, response) => {
  Note.find().then((notes) => {
    response.json(notes);
  });
});

// Read note by id
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Update note
app.put('/api/notes/:id', (request, response) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  // the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// Delete note by id
app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Midleware to run after the routes
// Handler of requests with unknown endpoint
const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// Handler of requests with result to errors
const errorHandler = (error, _, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
