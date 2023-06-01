const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static("build"))
app.use(cors())
app.use(express.json()) // let's activate the json parser and implement an initial handler for dealing with http post requests
const persons = 
    [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//fetching single resource
app.get("/api/persons/:id" , (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  response.json(person)
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(` Phonebook has info for ${persons.length} people ${date}`)
  })

  function generateNewId() {
    const min = 100000; // Minimum ID value
    const max = 999999; // Maximum ID value
  
    // Generate a random number within the specified range
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
  
    return randomId;
  }
  
app.post('/api/persons', (request, response) => {
  //first let's do it with postman
  const body = request.body
  if (!body.name && !body.number) {
    return response.status(404).json({error:"name and number are missing"})
  }

  const check = persons.some(persons => persons.name === body.name)
  
  if (check) {
    return response.status(404).json({error:"name and number must be unique"})
  }

  //let's make comparison in here then we'll do sth 
  // output should be true or false


  const person = {
    "name":body.name,
    "number":body.number,
    id: generateNewId(),
  }
  console.log(persons, person.name, person.number)
  people = persons.concat(person)//if you don't assign how is it gonna work
  response.json(person) //you don't want to add every single person to that url I put persons there because  I wanted to see al of em in added format
  


})


app.delete("/api/persons/:id", (request, response) => {
  //basicly what I'm goint to do is get the id from params then discard the specific id that's given
  const id = Number(request.params.id)
  const people = persons.filter(person => person.id !== id)//I suppose to filter it damn it! it's gonna give one single resource
 
  //when operations are completed send me 204 status code
  response.status(204).end()
  //response.status(204).end()
})
const PORT = process.env.port || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})