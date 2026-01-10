import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebook from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [confirmMessage, setConfirmMessage] = useState(null)

  useEffect(() => {
    phonebook.getAll().then((contacts) => setPersons(contacts));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
      // id: `${persons.length + 2}`,
    };
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        if (
          confirm(
            `${newName} already exists in the phonebook, Would you like to replace the old number with the new one?`
          )
        ) {
          phonebook.update(persons[i].id, newContact).then((updatedContact) =>
            setPersons(
              persons.map((personInContacts) => {
                if (personInContacts.id === updatedContact.id) {
                  return updatedContact;
                } else {
                  return personInContacts;
                }
              })
            )
          );
          setNewName("");
          setNewNumber("");
          return;
        } else {
          return;
        }
      }
    }
    phonebook
      .create(newContact)
      .then((updatedContacts) => setPersons(persons.concat(updatedContacts)));
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (event, person) => {
    event.preventDefault();
    if (confirm(`Are you sure you want to delete ${person.name}?`)) {
      phonebook.deleteContact(person.id);
      setPersons(
        persons.filter((personInContacts) => personInContacts.id !== person.id)
      );
    } else {
      console.log("function cancelled");
    }
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
      <Notification message={confirmMessage}/>
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
      <Persons people={contactsFiltered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
