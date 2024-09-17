import { useState,useEffect } from 'react'
import axios from "axios"
import phonebookServices from './services/phonebook'
import Error from './error'

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

const Persons = ({ namesToShow,deleteName }) => {
  return (
    <>
    <div>
      {namesToShow.map((person) => (
        <div key={person.id}>{person.name} {person.number}<button onClick={()=>deleteName(person.id)}>DELETE</button> </div>
      ))}
    </div>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [namesToShow, setNamesToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[currentName,setcurrentName] = useState('')
  const[errorStatus,seterrorStatus] = useState()
  

  useEffect(()=>{
    phonebookServices
    .getAll()
    .then((response)=>{
      console.log(response.data)
      setPersons(response.data)
      setNamesToShow(response.data)
      console.log(persons)
    })

  },[])

  function addname(event) {
    event.preventDefault()
    for (let i = 0; i < persons.length; i++) {
      // if (persons[i].name === newName) {
      //   phonebookServices
      //   .update(persons[i].id,newNumber)
      //   .then(()=>{
      //     const updatedPersons = persons.map(person =>
      //       person.id === persons[i].id ? { ...person, number: newNumber } : person
      //     );
      //     setPersons(updatedPersons);
          
      //     setNamesToShow(updatedPersons);
      //     setNewName("");
      //     setNewNumber("");})
        
      //   return 0;
      // }
    }
    phonebookServices
    .create({ name: newName, number: newNumber })
    .then(response=>{
      const updatedPeople=response.data
      console.log(updatedPeople)
      setPersons(updatedPeople)
      setNamesToShow(updatedPeople)
      setNewName("")
      setNewNumber("")
    })
    .catch((err)=>{
      console.log(err)
    })
    setcurrentName(newName)
    seterrorStatus(true)
    setTimeout(() => {
      setcurrentName(null);
    }, 5000);
    
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

  function deleteName(id) {
    if (window.confirm("Are you sure you want to delete this person?")) {
      phonebookServices
        .remove(id)
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== id);
          setPersons(updatedPersons);
          setNamesToShow(updatedPersons);
        })
        .catch(error => {
          seterrorStatus(false)
          
        });
    }
  }
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Error name={currentName} errorStatus={errorStatus}/>

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

      <Persons namesToShow={namesToShow}
                deleteName={deleteName} />
    </div>
  )
}

export default App
