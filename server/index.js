require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const Entry = require('./models/entry');

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

app.get('/', (req, res) => res.send('<h1>Phone Book</h1>'));

app.get('/api/phone-book', (_, res) => {
  Entry.find({})
    .then((entries) => res.json(entries))
    .catch((err) => {
      console.error(
        '\x1b[41m%s\x1b[0m',
        `error finding phone book entries: ${err}`
      );
      mongoose.connection.close();
      process.exit(1);
    });
});

app.get('/api/phone-book/:id', (req, res) => {
  const person = phoneBook.find(
    (person) => person.id === parseInt(req.params.id)
  );
  if (!person) return res.status(404).end();
  res.json(person);
});

app.post('/api/phone-book', (req, res) => {
  new Entry({
    name: req.body.name,
    phone: req.body.phone
  })
    .save()
    .then((entry) => res.json(entry))
    .catch((err) => console.error(err));
});

app.delete();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
