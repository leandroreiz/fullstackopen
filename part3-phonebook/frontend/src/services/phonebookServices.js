import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then((response) => response.data);
};

const update = (id, newNumber) => {
  const request = axios.put(`${baseUrl}/${id}`, newNumber);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

const phonebookServices = { getAll, create, update, deleteContact };

export default phonebookServices;
