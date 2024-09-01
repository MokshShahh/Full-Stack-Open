import { useState,useEffect } from 'react'
import axios from "axios"

const Filter = ({ filterfunc }) => {
  return (
    <div>
      <h1>FILTER NAMES TO SHOW</h1>
      name: <input onChange={filterfunc} /><br/>
    </div>
  )
}

const PersonForm = ({ addname, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addname}>
      <h1>ADD A NEW PERSON</h1>
      <div>
        name: <input value={newName} onChange={handleNameChange} /><br/>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ namesToShow }) => {
  return (
    <div>
      {namesToShow.map((person) => (
        <div key={person.name}>{person.name} {person.number}</div>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [namesToShow, setNamesToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then((response)=>{
      setPersons(response.data)
      setNamesToShow(response.data)
      console.log(persons)
    })

  },[])

  function addname(event) {
    event.preventDefault()
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} already exists in the phonebook`)
        setNewName("")
        return 0;
      }
    }
    const updatedPeople=persons.concat({ name: newName, number: newNumber })
    setPersons(updatedPeople)
    setNamesToShow(updatedPeople)
    setNewName("")
    setNewNumber("")
  }

  function handleNameChange(event) {
    setNewName(event.target.value)
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value)
  }

  function filterfunc(event) {
    setNamesToShow(persons.filter((person) => person.name.startsWith(event.target.value)))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterfunc={filterfunc} />

      <h3>Add a new</h3>

      <PersonForm
        addname={addname}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App
