const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());

//
// middleware before routes
//

/*
const requestLogger = (request, response, next) => {
  console.log("---");
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);
*/

app.use(morgan("tiny"));

//
// data
//

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//
// endpoints
//

//home
app.get("/", (request, response) => {
  response.send("<h1>Part 3</h1>");
});

//getAll
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//info
app.get("/info", (request, response) => {
  const date = new Date().toString();
  response.send(`
    <h4>Phonebook has info for ${persons.length} people</h4>
    <br/>
    <h5>${date}</h5>
    `);
});

//getById
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const foundPerson = persons.filter((p) => p.id === id);
  console.log("found: ", foundPerson);
  if (foundPerson.length !== 0) {
    return response.json(foundPerson);
  } else {
    return response.status(404).end();
  }
});

//delete
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons.filter((p) => p.id !== id);
  response.status(204).end();
});

//create
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(404).json({ error: "name or number missing" });
  }

  const foundDuplicate = persons.find(
    (p) => p.name.toLowerCase() === body.name.toLowerCase()
  );

  if (foundDuplicate) {
    return response
      .status(400)
      .json({ error: `${foundDuplicate.name} already exists` });
  }

  const person = {
    id: generateId(10, 9999999),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const generateId = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//
// middleware after routes
//

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: "unkown endpoint" });
};

app.use(unkownEndpoint);

//
// port config
//

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`express running on port ${PORT}`);
});
