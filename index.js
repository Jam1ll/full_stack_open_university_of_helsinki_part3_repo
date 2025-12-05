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

app.get("/", (request, response) => {
  response.send("<h1>Part 3</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//
// port config
//

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`express running on port ${PORT}`);
});
