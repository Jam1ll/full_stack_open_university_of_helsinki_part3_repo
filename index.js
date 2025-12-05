const express = require("express");

const app = express();

app.use(express.json());

//
// data
//

const persons = [
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

//
// port config
//

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`express running on port ${PORT}`);
});
