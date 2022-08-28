import { useState, useEffect } from 'react';

import phonebookServices from './services/phonebookServices';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    phonebookServices.getAll().then((contacts) => setPersons(contacts));
  }, []);

  const contactsToShow = !searchTerm
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification({
        message: null,
        type: null,
      });
    }, 5000);
  };

  const addContact = (event) => {
    event.preventDefault();
    const isContact = persons.find((p) => p.name === newName);

    if (isContact) {
      // if contact already exists
      const { id, name } = isContact;
      if (
        window.confirm(
          `${name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedContact = { name, number: newNumber };
        phonebookServices
          .update(id, updatedContact)
          .then((returnedContact) => {
            setPersons(persons.map((p) => (p.id !== id ? p : returnedContact)));
            showNotification(`${returnedContact.name} updated`, 'success');
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            showNotification(error.response.data.error, 'error');
          });
      }
    } else {
      // add a new contact
      phonebookServices
        .create({
          name: newName,
          number: newNumber,
        })
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact));
          showNotification(`Added ${returnedContact.name}`, 'success');

          // clear inputs
          setNewName('');
          setNewNumber('');

          return returnedContact;
        })
        .catch((error) => showNotification(error.response.data.error, 'error'));
    }
  };

  const handleDelete = (event) => {
    const id = event.target.value;
    const contactToBeDeleted = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${contactToBeDeleted.name}?`)) {
      phonebookServices.deleteContact(contactToBeDeleted.id);
      setPersons(persons.filter((p) => p.id !== contactToBeDeleted.id));
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter onChange={handleFilterChange} value={searchTerm} />
      <h3>Add new</h3>
      <PersonForm
        onSubmit={addContact}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={contactsToShow} onClick={handleDelete} />
    </>
  );
};

export default App;
