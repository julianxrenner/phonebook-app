import { useEffect, useState } from "react";
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 2}`,
    };
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} already exists in the phonebook`);
        return;
      }
    }
    const copyPeople = [...persons];
    copyPeople.push(newContact);
    setPersons(copyPeople);
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const contactsFiltered =
    filter === ""
      ? persons
      : persons.filter((person) => person.name.includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        handleChange={handleFilterChange}
        filter={filter}
      />
      <h3>Add New</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons people={contactsFiltered} />
    </div>
  );
};

export default App;
