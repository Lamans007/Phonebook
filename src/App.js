import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ShowPhonebook from './Components/ShowPhonebook';
import Form from './Components/Form';
import FilterInput from './Components/FilterInput';
import axios from 'axios';
import services from './Services/Services'

const App = () => {
  const [ persons, setPersons ] = useState([{name: 'Adam Sandler', number: '555-888-456', id: uuidv4()}]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredNames, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)


  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons/')
      .then(response => {
        console.log(response);
        setPersons(persons.concat(response.data))
        console.log(response)
      })
  }, [])

  
  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    let confirmPrompt;
    const recordedNames = persons.map( (person) => person.name)
    // if(recordedNames.includes(newName)){
    //   // return alert(`${newName} is already recorded!`)
    //   // confirmPrompt = Window.confirm(' is already recorded. Would you like to update their number?')
    // }
    if ( (recordedNames.includes(newName)) &&  window.confirm(' is already recorded. Would you like to update their number?') ){
      const updateContact = persons.find(person => person.name == newName)
      const idForUpdate = updateContact.id
      console.log(updateContact.id);
      const updatePersonObj = {
        name: newName,
        number: newNumber,
        // id: persons[persons.length-1].id + 1
        id: idForUpdate
      }
      services
      .update(idForUpdate, updatePersonObj)
      .then(returnedObj =>
        setPersons(persons.map(person => person.id !== idForUpdate ? person : returnedObj))

        
      )
    }


    if(!(recordedNames.includes(newName))){
    const personObj = {
      name: newName,
      number: newNumber,
      // id: persons[persons.length-1].id + 1
      id: uuidv4()
    }
    services
      .create(personObj)
      .then(returnObj => {
        console.log(returnObj)
        setPersons(persons.concat(returnObj))
      }
      ).catch(error => {
        console.log(error);
      })
    }
    setMessage(`${newName} was added to the phonebook!`)
    setNewName('')
    setNewNumber('')

    setTimeout(() => {
      setMessage(null)
    }, 5000);
    

    // setPersons(persons.concat(personObj))
    // setNewName('')
    // setNewNumber('')
  }

  const handleDelete = (event) => {
      if(window.confirm(`Are you sure you want to delete this record?`)){
        services
      .deleteRecord(event.target.value)
      setPersons(persons.map(person => person.id !== event.target.value ? person : ''))
      }

      
  }

 

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search</h3>
      <FilterInput filteredNames={filteredNames} handleFilter={handleFilter}/>

      <h3>Add</h3>
      <Form handleNameChange={handleNameChange} handleSubmit={handleSubmit} handleNumberChange={handleNumberChange} newNumber={newNumber} newName={newName} />

      <h2>Numbers</h2>
      <ShowPhonebook persons={persons} filteredNames={filteredNames} handleDelete={handleDelete} message={message}/>
    </div>
  )
}

export default App
