
const express = require('express')
const app = express()
const curTime = new Date()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())


let persons = [
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "dfgbth",
      "number": "",
      "id": "dcf1d74f-67e3-4c0f-ba09-ee4f1e928d79"
    },
    {
      "name": "ggg",
      "number": "",
      "id": "8ee0c259-bf7f-460f-9e47-d0a6be0ad243"
    },
    {
      "name": "hgjk",
      "number": "",
      "id": "5d320b88-2915-4541-87f7-a37de57b054a"
    },
    {
      "name": "dfghjk",
      "number": "",
      "id": "4a658fcd-40b1-4e8d-9606-499dfb9ae96c"
    },
    {
      "name": "sdfg",
      "number": "",
      "id": "fcfffd8c-b0fd-4834-bca8-3e1a7c6d78c0"
    },
    {
      "name": "dsfg",
      "number": "",
      "id": "14a4a430-7fea-497f-b2f3-18a1fb2ed04d"
    },
    {
      "name": "csdvxfcghj",
      "number": "",
      "id": "7613f54f-cfa6-41c8-b95c-023d4f862812"
    },
    {
      "name": "scdfgh",
      "number": "",
      "id": "74a4c856-f4d6-439b-b387-836e551513bb"
    },
    {
      "name": "asedgrfghj",
      "number": "",
      "id": "5"
    }
  ]
  app.use(morgan('tiny'));

app.get('/api/persons', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
     res.json(persons)
})

app.get('/info', (req, res) => {
    let num = persons.length
    const curTime = new Date()
    res.send(`<div>
    <h4>There are ${num} records in the phonebook.</h4>
    <h5>${curTime}</h5>
    </div>`)

})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const recordToReturn = persons.find(p => p.id == id)
    //   res.send('<h1>Hello World!</h1>')

    res.json(recordToReturn)
    })

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id != id)
    //   res.send('<h1>Hello World!</h1>')

    res.status(204).end()
    })

    app.post('/api/persons/', (req, res) => {
        const names = persons.names.map(n => n)
        if(names.includes(res.name)){
            res.status(409).end('Name already in recorded.')
        }
        if(!res.name) {
            res.status(400).end('Missing name')
        }
        if(!res.number){
            res.status(400).end('Missing number.')
        }
        const newRecord = {
            name: res.name,
            number: res.number,
            id: Math.floor(Math.random()* 1564595)
        }
        
        //   res.send('<h1>Hello World!</h1>')
        persons.push(newRecord)
        res.json(newRecord)
        })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})