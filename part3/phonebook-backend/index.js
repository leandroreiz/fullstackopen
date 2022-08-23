const express = require('express');

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const PORT = 3001;
const app = express();

app.use(express.json());

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find((p) => p.id === Number(request.params.id));

  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: 'Person not found' });
  }
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(body);
  const id = Math.floor(Math.random() * 10000);

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'please fill all the fields' });
  }

  const exists = persons.find((p) => p.name === body.name);
  if (exists) {
    return response.status(400).json({ error: 'name must be unique' });
  }

  const person = {
    id,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
