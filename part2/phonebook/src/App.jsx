import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:"9833785128" }
  ]) 
  const [namesToShow, setNamesToShow] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')

function addname(event){
  event.preventDefault()
  for(let i=0;i<persons.length;i++){
    if(persons[i].name===newName){
      alert(`${newName} aldredy exists in the phone book`)
      setNewName("")
      return 0;
    }
  }
  setPersons(persons.concat({name:newName,number:newNumber}))
  setNewName("")
  setNewNumber("")
  
}

function handleNameChange(event){
  setNewName(event.target.value)
}

function handleNumberChange(event){
  setNewNumber(event.target.value)
}

function filterfunc(event){
  setNamesToShow(persons.filter((person)=>person.name.startsWith(event.target.value)))

}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addname}>
      <h1>ADD A NEW PERSON</h1>
        <div>
          name: <input value={newName} onChange={handleNameChange} /><br/>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <h1>FILTER NAMES TO SHOW</h1>
        name: <input onChange={filterfunc} /><br/>

        
        
      </form>
      <h2>Numbers</h2>
      <div>
      {namesToShow.map((person) => (
          <div key={person.name}>{person.name} {person.number}</div>))}
      </div>
    </div>
  )
}

export default App