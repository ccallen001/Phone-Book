import { useState, useEffect } from 'react';

import phoneBookService from './services/phone-book';

import Filter from './components/Filter';
import AddNew from './components/AddNew';
import PhoneBook from './components/PhoneBook';

import Notification from './components/Notification';

console.clear();

const App = () => {
  const [phoneBook, setPhoneBook] = useState([]);

  const [filter, setFilter] = useState('');

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const filtered = phoneBook.filter((entry) =>
    entry.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    phoneBookService.getAll().then((phoneBook) => setPhoneBook(phoneBook));
  }, []);

  function handleAdd() {
    const existingEntry = phoneBook.find((entry) => entry.name === newName);

    if (existingEntry) {
      const userConfirmed = window.confirm(
        `${newName} is already added to phone book. Do you want to update the number?`
      );

      if (!userConfirmed) return;

      phoneBookService
        .updateEntry(existingEntry.id, {
          name: existingEntry.name,
          number: newPhone
        })
        .then(() => {
          phoneBookService.getAll().then((phoneBook) => {
            setNewName('');
            setNewPhone('');
            setPhoneBook(phoneBook);
          });
        })
        .catch(() =>
          setErrorMessage({
            msg: `Cannot update ${existingEntry.name}, they have already been deleted.`,
            color: 'red'
          })
        );

      return;
    }

    phoneBookService
      .addEntry({ name: newName, phone: newPhone })
      .then((entry) => {
        setPhoneBook(phoneBook.concat(entry));
        setErrorMessage({ msg: 'Entry successfully added.', color: 'green' });
        setTimeout(() => setErrorMessage(null), 3000);
      });

    setNewName('');
    setNewPhone('');
  }

  function handleDelete(id, name) {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!userConfirmed) return;

    phoneBookService
      .deleteEntry(id)
      .then(() => {
        phoneBookService.getAll().then((phoneBook) => setPhoneBook(phoneBook));
        setErrorMessage({ msg: 'User successfully deleted.', color: 'green' });
        setTimeout(() => setErrorMessage(null), 3000);
      })
      .catch((error) => alert(error));
  }

  return (
    <div>
      <h1>Phone Book</h1>
      {errorMessage && (
        <Notification
          message={errorMessage.msg}
          style={{ color: errorMessage.color }}
        />
      )}
      <Filter setFilter={setFilter} />
      <AddNew
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleAdd={handleAdd}
      />
      <PhoneBook filtered={filtered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
