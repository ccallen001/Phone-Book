import axios from 'axios';

const baseUrl = '/api/phone-book/';

const getAll = () => axios.get(baseUrl).then(({ data }) => data);

const addEntry = (newPerson) =>
  axios.post(baseUrl, newPerson).then(({ data }) => data);

const updateEntry = (id, updatedPerson) =>
  axios.put(`${baseUrl}/${id}`, updatedPerson).then(({ data }) => data);

const deleteEntry = (id) => axios.delete(`${baseUrl}/${id}`);

const exports = {
  getAll,
  addEntry,
  updateEntry,
  deleteEntry
};

export default exports;
