require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

const phoneBook = [
  {
    name: 'Ada Lovelace',
    phone: '66666666',
    id: 2
  },
  {
    name: 'Mary Poppendieck',
    phone: '77777777',
    id: 4
  },
  {
    name: 'Arto Hellas',
    phone: '8888888888',
    id: 9
  },
  {
    name: 'What, another test???',
    phone: '000000000000',
    id: 11
  }
];

const generateId = () =>
  (phoneBook.length > 0 ? Math.max(...phoneBook.map((n) => n.id)) : 0) + 1;

app.get('/', (req, res) => res.send('<h1>Phone Book</h1>'));

app.get('/api/phone-book', (req, res) => res.json(phoneBook));

app.get('/api/phone-book/:id', (req, res) => {
  const person = phoneBook.find(
    (person) => person.id === parseInt(req.params.id)
  );
  if (!person) return res.status(404).end();
  res.json(person);
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
