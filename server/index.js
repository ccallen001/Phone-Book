require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT;

const Entry = require('./models/entry');

const unknownInput = (_req, res) =>
  res.status(404).send({ error: 'unknown endpoint' });

const errorHandler = (error, _, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'mal formatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('<h1>Phone Book</h1>'));

app.get('/api/phone-book', (_, res) => {
  Entry.find({})
    .then((entries) => res.json(entries))
    .catch((err) => {
      console.error(
        '\x1b[41m%s\x1b[0m',
        `error finding phone book entries: ${err}`
      );
      process.exit(1);
    });
});

app.get('/api/phone-book/:id', (req, res, next) => {
  Entry.findById(req.params.id)
    .then((entry) => (entry ? res.json(entry) : res.status(404).end()))
    .catch((err) => next(err));
});

app.post('/api/phone-book', (req, res, next) => {
  new Entry({
    name: req.body.name,
    number: req.body.number
  })
    .save()
    .then((entry) => res.json(entry))
    .catch((err) => next(err));
});

app.put('/api/phone-book/:id', (req, res, next) => {
  const { name, number } = req.body;

  Entry.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((entry) => res.json(entry))
    .catch((err) => next(err));
});

app.delete('/api/phone-book/:id', (req, res, next) =>
  Entry.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err))
);

app.use(unknownInput);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
