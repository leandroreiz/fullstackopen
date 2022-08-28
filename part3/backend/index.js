// --------------------------------------
// Imports & Constants
// --------------------------------------

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
const app = express()
const PORT = process.env.PORT

// --------------------------------------
// Helper functions
// --------------------------------------

const requestLogger = (request, _, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// --------------------------------------
// Middleware
// --------------------------------------

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

// --------------------------------------
// Routes
// --------------------------------------

// Home page (redirected to static 'build' folder)
app.get('/', (_, response) => {
  response.send('<h1>Hello Express</h1>')
})

// CREATE note
app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then((savedNote) => {
      response.status(201).json(savedNote)
    })
    .catch((error) => next(error))
})

// READ all notes
app.get('/api/notes', (_, response, next) => {
  Note.find()
    .then((notes) => {
      response.json(notes)
    })
    .catch((error) => next(error))
})

// READ note by id
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// UPDATE note
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

// DELETE note
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// --------------------------------------
// Post-Midleware
// --------------------------------------

// Handler of requests with unknown endpoint
const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Handler of requests with result to errors
const errorHandler = (error, _, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// Call post-middleware
app.use(unknownEndpoint)
app.use(errorHandler)

// --------------------------------------
// Start server
// --------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
